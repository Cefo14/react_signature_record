import {
  useState,
  useCallback,
  useMemo,
} from 'react';
import { RecordRTCPromisesHandler } from 'recordrtc';

/**
 * 
 * @param {React.MutableRefObject<HTMLVideoElement>} video 
 * @param {React.MutableRefObject<HTMLCanvasElement>} canvas 
 * @param {Function} drawAnimationFrame 
 * @param {{
 *  video: Boolean,
 *  audio: Boolean
 * }} config
 */
const useCanvasRecordWithUserMedia = (
  video,
  canvas,
  drawAnimationFrame,
  config = { video: true, audio: false },
) => {
  const [userMediaStream, setUserMediaStream] = useState(null);
  const [canvasStream, setCanvasStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const startUserMedia = useCallback(async () => {
    const userMediaStream = await navigator.mediaDevices.getUserMedia(config);

    video.current.srcObject = userMediaStream;
    video.current.load();
    video.current.play();

    setIsCapturing(true);
    setUserMediaStream(userMediaStream);

    return userMediaStream;
  }, [config, video]);

  const stopUserMedia = useCallback(() => {
    userMediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  
    video.current.srcObject = null;

    setUserMediaStream(null);
    setIsCapturing(false);
  }, [userMediaStream, video]);

  const startCanvasStream = useCallback((_userMediaStream) => {
    const locaUserMedia = _userMediaStream || userMediaStream;

    drawAnimationFrame();
    const canvasStream = canvas.current.captureStream();

    locaUserMedia.getAudioTracks().forEach((track) => {
      canvasStream.addTrack(track);
    });

    setCanvasStream(canvasStream);

    return canvasStream;
  }, [canvas, drawAnimationFrame, userMediaStream]);

  const stopCanvasStream = useCallback(() => {
    setCanvasStream(null);
  }, []);

  const startRecord = useCallback((_canvasStream) => {
    const localCanvasStream = _canvasStream || canvasStream;
    const _recorder = new RecordRTCPromisesHandler(localCanvasStream, { mimeType: 'video/webm' });
    _recorder.startRecording();

    setRecorder(_recorder);
    setIsRecording(true);
  }, [canvasStream]);

  const stopRecord = useCallback(async () => {
    await recorder.stopRecording();
    const blob = await recorder.getBlob();

    setIsRecording(false);
    setRecorder(null);

    return blob;
  }, [recorder]);

  const startVideo = useCallback(async () => {
    const _userMedia = await startUserMedia();
    startCanvasStream(_userMedia);
  }, [startUserMedia, startCanvasStream]);

  const stopVideo = useCallback(() => {
    stopCanvasStream();
    stopUserMedia();
  }, [stopCanvasStream, stopUserMedia]);

  return useMemo(() => ({
    startUserMedia,
    stopUserMedia,
    startCanvasStream,
    stopCanvasStream,
    startRecord,
    stopRecord,
    startVideo,
    stopVideo,
    userMediaStream,
    canvasStream,
    recorder,
    isCapturing,
    isRecording,
  }), [
    startUserMedia,
    stopUserMedia,
    startCanvasStream,
    stopCanvasStream,
    startRecord,
    stopRecord,
    startVideo,
    stopVideo,
    userMediaStream,
    canvasStream,
    recorder,
    isCapturing,
    isRecording,
  ]);
};

export default useCanvasRecordWithUserMedia;