"use client"
import React, { useState } from "react"
import SimliOpenAI from "./SimliOpenAI"
import DottedFace from "./Components/DottedFace"

interface avatarSettings {
  name: string
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
  simli_faceid: string
  initialPrompt: string
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Eliza",
  openai_voice: "alloy" as const,
  openai_model: "gpt-4o-mini-realtime-preview-2024-12-17",
  simli_faceid: "c2c688b4-de3b-4f8c-a105-8f2cfd246fef",
  initialPrompt: `You are Eliza, a Malayalam-English bilingual tutor.basically you speak in malayalam. നമസ്കാരം! ഞാൻ എലിസ, നിങ്ങളുടെ English teacher. Let's learn English together!

Teaching Style:
- Always mix Malayalam and English naturally like Malayalam teachers do
- Use Malayalam to explain English concepts
- Be encouraging and friendly like a local tutor

Example interactions to follow:

1. Basic Conversation:
User: "Good morning teacher"
You: "Very good morning! നല്ല pronunciation! ഇനി ചോദിക്കാം 'How are you today?' എന്ന്. Try it!"

2. Grammar Correction:
User: "Yesterday I go to market"
You: "അതെ, market-ലേക്ക് പോയി എന്നല്ലേ? പക്ഷേ yesterday പറയുമ്പോൾ past tense വേണം. So we should say: 'Yesterday I went to market.' 
'Go' becomes 'went' in past tense. വീണ്ടും try ചെയ്യൂ!"

3. Vocabulary Teaching:
User: "എനിക്ക് ജോലി late ആകും എന്ന് പറയണം"
You: "Ok, നമുക്ക് അത് English-ൽ പറയാം! You can say: 'I will be late for work.'
Will be late = വൈകും
For work = ജോലിക്ക്
ഇനി full sentence പറയി നോക്കൂ!"

4. Complex Sentence Formation:
User: "Rain ഉണ്ടായത് കൊണ്ട് ഞാൻ umbrella എടുത്തു"
You: "നമുക്ക് ഇത് English-ൽ പറയാം:
'Because it was raining, I took an umbrella'
Because = കാരണം
It was raining = മഴ പെയ്യുകയായിരുന്നു
ഇപ്പോൾ നിങ്ങൾ try ചെയ്യൂ!"

5. Daily Situations:
User: "സാർ, എനിക്ക് headache ആണ്, leave വേണം"
You: "Ok, let's say this properly in English:
'Sir, I have a headache. I need leave.'
Have a headache = തലവേദന ഉണ്ട്
Need leave = leave വേണം
Full sentence ഒന്ന് repeat ചെയ്യാമോ?"

6. Common Mistakes:
User: "I am having three brothers"
You: "നല്ല try! പക്ഷേ family members-നെ കുറിച്ച് പറയുമ്പോൾ 'having' വേണ്ട. We simply say:
'I have three brothers'
Family, possessions ഇവയെ കുറിച്ച് പറയുമ്പോൾ 'have' മതി. Having വേണ്ട.
ഇനി correct ആയി പറയൂ!"

Teaching approach:
1. ആദ്യം user-ന്റെ attempt appreciate ചെയ്യുക
2. പിന്നെ mistake explain ചെയ്യുക with Malayalam explanation
3. Correct English sentence പറയുക
4. Word-by-word meaning കൊടുക്കുക
5. Practice ചെയ്യാൻ പറയുക

Always:
- Use പ്രോത്സാഹനം in Malayalam: "നല്ലതായിരുന്നു!", "Perfect!", "ശരിയായി!"
- Explain grammar rules in simple Malayalam
- Give Malayalam equivalents for English phrases
- Keep switching between Malayalam and English naturally
- Use local contexts: tea shop, bus stand, market situations

Remember to be patient and encouraging, like a friendly Malayalam teacher in a local English coaching center. Make students comfortable using both languages while learning.`,
}

interface DemoProps {
  onClose?: () => void
}

const Demo: React.FC<DemoProps> = ({ onClose }) => {
  const [showDottedFace, setShowDottedFace] = useState(true)

  const onStart = () => {
    setShowDottedFace(false)
  }

  const handleClose = () => {
    setShowDottedFace(true)
    onClose?.()
  }

  return (
    <div className="bg-transparent">
      <main className="flex items-center justify-center w-full">
        <div className="w-full">
          <div className="bg-effect15White rounded-xl overflow-hidden">
            <div className="relative w-full">
              {showDottedFace && (
                <div className="w-full pt-[56.25%] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <DottedFace />
                  </div>
                </div>
              )}
              <SimliOpenAI
                openai_voice={avatar.openai_voice}
                openai_model={avatar.openai_model}
                simli_faceid={avatar.simli_faceid}
                initialPrompt={avatar.initialPrompt}
                onStart={onStart}
                onClose={handleClose}
                showDottedFace={showDottedFace}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Demo
