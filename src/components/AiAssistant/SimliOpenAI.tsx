import React, { useCallback, useEffect, useRef, useState } from "react"
import { RealtimeClient } from "@openai/realtime-api-beta"
import { SimliClient } from "simli-client"
import VideoBox from "./Components/VideoBox"
import cn from "./utils/TailwindMergeAndClsx"
import { motion } from "framer-motion"

import IconSparkleLoader from "./media/IconSparkleLoader"
import { MessageSquare } from "lucide-react"

interface SimliOpenAIProps {
  simli_faceid: string
  openai_voice:
    | "alloy"
    | "ash"
    | "ballad"
    | "coral"
    | "echo"
    | "sage"
    | "shimmer"
    | "verse"
  openai_model: string
  initialPrompt: string
  onStart: () => void
  onClose: () => void
  showDottedFace: boolean
}

const simliClient = new SimliClient()

const SimliOpenAI: React.FC<SimliOpenAIProps> = ({
  simli_faceid,
  openai_voice,
  openai_model,
  initialPrompt,
  onStart,
  onClose,
  showDottedFace,
}) => {
  // State management
  const [isLoading, setIsLoading] = useState(false)
  const [isAvatarVisible, setIsAvatarVisible] = useState(false)
  const [error, setError] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [userMessage, setUserMessage] = useState("...")

  // Refs for various components and states
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const openAIClientRef = useRef<RealtimeClient | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const isFirstRun = useRef(true)

  // New refs for managing audio chunk delay
  const audioChunkQueueRef = useRef<Int16Array[]>([])
  const isProcessingChunkRef = useRef(false)

  /**
   * Initializes the Simli client with the provided configuration.
   */
  const initializeSimliClient = useCallback(() => {
    if (videoRef.current && audioRef.current) {
      const SimliConfig = {
        apiKey: import.meta.env.VITE_SIMLI_API_KEY,
        faceID: simli_faceid,
        handleSilence: true,
        maxSessionLength: 6000, // in seconds
        maxIdleTime: 6000, // in seconds
        videoRef: videoRef.current,
        audioRef: audioRef.current,
        enableConsoleLogs: true,
      }

      simliClient.Initialize(SimliConfig as any)
      console.log("Simli Client initialized")
    }
  }, [simli_faceid])

  /**
   * Initializes the OpenAI client, sets up event listeners, and connects to the API.
   */
  const initializeOpenAIClient = useCallback(async () => {
    try {
      console.log("Initializing OpenAI client...")
      openAIClientRef.current = new RealtimeClient({
        model: openai_model,
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowAPIKeyInBrowser: true,
      })

      await openAIClientRef.current.updateSession({
        instructions: initialPrompt,
        voice: openai_voice,
        turn_detection: { type: "server_vad" },
        input_audio_transcription: { model: "whisper-1" },
      })

      // Set up event listeners
      openAIClientRef.current.on(
        "conversation.updated",
        handleConversationUpdate
      )

      openAIClientRef.current.on(
        "conversation.interrupted",
        interruptConversation
      )

      openAIClientRef.current.on(
        "input_audio_buffer.speech_stopped",
        handleSpeechStopped
      )
      // openAIClientRef.current.on('response.canceled', handleResponseCanceled);

      await openAIClientRef.current.connect().then(() => {
        console.log("OpenAI Client connected successfully")
        openAIClientRef.current?.createResponse()
        startRecording()
      })

      setIsAvatarVisible(true)
    } catch (error: any) {
      console.error("Error initializing OpenAI client:", error)
      setError(`Failed to initialize OpenAI client: ${error.message}`)
    }
  }, [initialPrompt])

  /**
   * Handles conversation updates, including user and assistant messages.
   */
  const handleConversationUpdate = useCallback((event: any) => {
    console.log("Conversation updated:", event)
    const { item, delta } = event

    if (item.type === "message" && item.role === "assistant") {
      console.log("Assistant message detected")
      if (delta && delta.audio) {
        const downsampledAudio = downsampleAudio(delta.audio, 24000, 16000)
        audioChunkQueueRef.current.push(downsampledAudio)
        if (!isProcessingChunkRef.current) {
          processNextAudioChunk()
        }
      }
    } else if (item.type === "message" && item.role === "user") {
      setUserMessage(item.content[0].transcript)
    }
  }, [])

  /**
   * Handles interruptions in the conversation flow.
   */
  const interruptConversation = () => {
    console.warn("User interrupted the conversation")
    simliClient?.ClearBuffer()
    openAIClientRef.current?.cancelResponse("")
  }

  /**
   * Processes the next audio chunk in the queue.
   */
  const processNextAudioChunk = useCallback(() => {
    if (
      audioChunkQueueRef.current.length > 0 &&
      !isProcessingChunkRef.current
    ) {
      isProcessingChunkRef.current = true
      const audioChunk = audioChunkQueueRef.current.shift()
      if (audioChunk) {
        const chunkDurationMs = (audioChunk.length / 16000) * 1000 // Calculate chunk duration in milliseconds

        // Send audio chunks to Simli immediately
        simliClient?.sendAudioData(audioChunk as any)
        console.log(
          "Sent audio chunk to Simli:",
          chunkDurationMs,
          "Duration:",
          chunkDurationMs.toFixed(2),
          "ms"
        )
        isProcessingChunkRef.current = false
        processNextAudioChunk()
      }
    }
  }, [])

  /**
   * Handles the end of user speech.
   */
  const handleSpeechStopped = useCallback((event: any) => {
    console.log("Speech stopped event received", event)
  }, [])

  /**
   * Applies a simple low-pass filter to prevent aliasing of audio
   */
  const applyLowPassFilter = (
    data: Int16Array,
    cutoffFreq: number,
    sampleRate: number
  ): Int16Array => {
    // Simple FIR filter coefficients
    const numberOfTaps = 31 // Should be odd
    const coefficients = new Float32Array(numberOfTaps)
    const fc = cutoffFreq / sampleRate
    const middle = (numberOfTaps - 1) / 2

    // Generate windowed sinc filter
    for (let i = 0; i < numberOfTaps; i++) {
      if (i === middle) {
        coefficients[i] = 2 * Math.PI * fc
      } else {
        const x = 2 * Math.PI * fc * (i - middle)
        coefficients[i] = Math.sin(x) / (i - middle)
      }
      // Apply Hamming window
      coefficients[i] *=
        0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (numberOfTaps - 1))
    }

    // Normalize coefficients
    const sum = coefficients.reduce((acc, val) => acc + val, 0)
    coefficients.forEach((_, i) => (coefficients[i] /= sum))

    // Apply filter
    const result = new Int16Array(data.length)
    for (let i = 0; i < data.length; i++) {
      let sum = 0
      for (let j = 0; j < numberOfTaps; j++) {
        const idx = i - j + middle
        if (idx >= 0 && idx < data.length) {
          sum += coefficients[j] * data[idx]
        }
      }
      result[i] = Math.round(sum)
    }

    return result
  }

  /**
   * Downsamples audio data from one sample rate to another using linear interpolation
   * and anti-aliasing filter.
   *
   * @param audioData - Input audio data as Int16Array
   * @param inputSampleRate - Original sampling rate in Hz
   * @param outputSampleRate - Target sampling rate in Hz
   * @returns Downsampled audio data as Int16Array
   */
  const downsampleAudio = (
    audioData: Int16Array,
    inputSampleRate: number,
    outputSampleRate: number
  ): Int16Array => {
    if (inputSampleRate === outputSampleRate) {
      return audioData
    }

    if (inputSampleRate < outputSampleRate) {
      throw new Error("Upsampling is not supported")
    }

    // Apply low-pass filter to prevent aliasing
    // Cut off at slightly less than the Nyquist frequency of the target sample rate
    const filteredData = applyLowPassFilter(
      audioData,
      outputSampleRate * 0.45, // Slight margin below Nyquist frequency
      inputSampleRate
    )

    const ratio = inputSampleRate / outputSampleRate
    const newLength = Math.floor(audioData.length / ratio)
    const result = new Int16Array(newLength)

    // Linear interpolation
    for (let i = 0; i < newLength; i++) {
      const position = i * ratio
      const index = Math.floor(position)
      const fraction = position - index

      if (index + 1 < filteredData.length) {
        const a = filteredData[index]
        const b = filteredData[index + 1]
        result[i] = Math.round(a + fraction * (b - a))
      } else {
        result[i] = filteredData[index]
      }
    }

    return result
  }

  /**
   * Stops audio recording from the user's microphone
   */
  const stopRecording = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect()
      processorRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsRecording(false)
    console.log("Audio recording stopped")
  }, [])

  /**
   * Handles stopping the interaction, cleaning up resources and resetting states.
   */
  const handleStop = useCallback(() => {
    console.log("Stopping interaction...")
    setIsLoading(false)
    setError("")
    stopRecording()
    setIsAvatarVisible(false)
    simliClient?.close()
    openAIClientRef.current?.disconnect()
    if (audioContextRef.current) {
      audioContextRef.current?.close()
      audioContextRef.current = null
    }
    onClose()
    console.log("Interaction stopped")
  }, [stopRecording, onClose])

  /**
   * Simli Event listeners
   */
  const eventListenerSimli = useCallback(() => {
    if (simliClient) {
      simliClient?.on("connected", () => {
        console.log("SimliClient connected")
        initializeOpenAIClient()
      })

      simliClient?.on("disconnected", () => {
        console.log("SimliClient disconnected")
        openAIClientRef.current?.disconnect()
        if (audioContextRef.current) {
          audioContextRef.current?.close()
        }
      })
    }
  }, [initializeOpenAIClient])

  // Add check for browser compatibility
  const checkMediaDevices = useCallback(async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      throw new Error("Your browser does not support audio recording")
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      return true
    } catch (err) {
      throw new Error("Microphone permission denied")
    }
  }, [])

  /**
   * Starts audio recording from the user's microphone.
   */
  const startRecording = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 })
    }

    try {
      console.log("Starting audio recording...")
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      const source = audioContextRef.current.createMediaStreamSource(
        streamRef.current
      )
      processorRef.current = audioContextRef.current.createScriptProcessor(
        2048,
        1,
        1
      )

      processorRef.current.onaudioprocess = e => {
        const inputData = e.inputBuffer.getChannelData(0)
        const audioData = new Int16Array(inputData.length)
        let sum = 0

        for (let i = 0; i < inputData.length; i++) {
          const sample = Math.max(-1, Math.min(1, inputData[i]))
          audioData[i] = Math.floor(sample * 32767)
          sum += Math.abs(sample)
        }

        openAIClientRef.current?.appendInputAudio(audioData)
      }

      source.connect(processorRef.current)
      processorRef.current.connect(audioContextRef.current.destination)
      setIsRecording(true)
      console.log("Audio recording started")
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setError("Error accessing microphone. Please check your permissions.")
    }
  }, [])

  /**
   * Handles the start of the interaction
   */
  const handleStart = useCallback(async () => {
    setIsLoading(true)
    setError("")
    onStart()

    try {
      console.log("Starting...")
      initializeSimliClient()
      await simliClient?.start()
      eventListenerSimli()
    } catch (error: any) {
      console.error("Error starting interaction:", error)
      setError(`Error starting interaction: ${error.message}`)
    } finally {
      setIsAvatarVisible(true)
      setIsLoading(false)
    }
  }, [onStart])

  return (
    <div className="flex flex-col w-full relative">
      {/* Video container */}
      <div
        className={cn(
          "transition-all duration-300 w-full",
          showDottedFace ? "h-0 overflow-hidden" : "block"
        )}
      >
        <div className="flex items-center justify-center">
          <VideoBox video={videoRef} audio={audioRef} />
        </div>
      </div>

      {/* Controls container - now relative positioning */}
      <div className="mt-10 px-4">
        <div className="max-w-md mx-auto">
          {!isAvatarVisible ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.5 }}
              onClick={handleStart}
              disabled={isLoading}
              className={cn(
                "w-full h-[45px] disabled:bg-[#343434] disabled:text-white",
                "bg-gradient-to-r from-primary/10 to-cyan-400/10",
                "px-6 rounded-[100px] transition-all duration-300",
                "hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
                "hover:scale-[1.02]",
                "flex justify-center items-center gap-3",
                "border border-primary/30 backdrop-blur-sm",
                "group relative overflow-hidden whitespace-nowrap",
                "after:absolute after:inset-0",
                "after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent",
                "after:animate-slide-slow",
                "after:bg-[length:200%_100%]"
              )}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <IconSparkleLoader className="h-[20px] animate-loader" />
                  <span className="font-mono text-base text-primary tracking-wide">
                    Connecting to Teza...
                  </span>
                </div>
              ) : (
                <>
                  <MessageSquare
                    size={18}
                    className="text-primary group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="font-mono text-base text-primary tracking-wide">
                    Talk to my AI Assistant
                  </span>
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={handleStop}
              className={cn(
                "w-full h-[45px]",
                "bg-gradient-to-r from-primary/10 to-cyan-400/10",
                "px-6 rounded-[100px] transition-all duration-300",
                "hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
                "hover:scale-[1.02]",
                "flex justify-center items-center gap-3",
                "border border-red-500/30 backdrop-blur-sm",
                "group relative overflow-hidden whitespace-nowrap",
                "after:absolute after:inset-0",
                "after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent",
                "after:animate-slide-slow",
                "after:bg-[length:200%_100%]"
              )}
            >
              <span className="font-mono text-base text-red-500 tracking-wide">
                Disconnect
              </span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="fixed top-4 left-4 right-4 bg-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}

export default SimliOpenAI
