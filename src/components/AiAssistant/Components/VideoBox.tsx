export default function VideoBox(props: any) {
  return (
    <div className="aspect-video flex rounded-full overflow-hidden items-center h-[200px] w-[200px] justify-center bg-simligray">
      <video ref={props.video} autoPlay playsInline></video>
      <audio ref={props.audio} autoPlay></audio>
    </div>
  )
}
