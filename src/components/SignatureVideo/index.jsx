import React, { useRef, memo, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import FloatIconButton from '../FloatIconButton';

import useSignaturePad from '../../hooks/useSignaturePad';
import useCanvasRecordWithUserMedia from '../../hooks/useCanvasRecordWithUserMedia';

import useStyles from './styles';

const CANVAS_BACKGROUND_COLOR = 'rgba(0,0,0, 0.1)';

const SignatureVideo = ({ onStop }) => {
  const classes = useStyles();

  const parentRef = useRef(null);
  const videoRef = useRef(null);
  const videoCanvasRef = useRef(null);
  const signaturePadCanvasRef = useRef(null);
  const [isLock, setIsLock] = useState(false);

  const drawAnimationFrame = useCallback(() => {
    if (videoCanvasRef.current === null) return;

    const videoCanvas = videoCanvasRef.current;
    const signaturePadCanvas = signaturePadCanvasRef.current;
    const video = videoRef.current;

    const videoCanvasContext = videoCanvas.getContext('2d');

    if (video.paused || video.ended) return;

    videoCanvasContext.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
    videoCanvasContext.drawImage(signaturePadCanvas, 0, 0, signaturePadCanvas.width, signaturePadCanvas.height);

    requestAnimationFrame(drawAnimationFrame);
  }, []);

  const signaturePad = useSignaturePad(signaturePadCanvasRef, CANVAS_BACKGROUND_COLOR);
  const canvasRecordWithUserMedia = useCanvasRecordWithUserMedia(videoRef, videoCanvasRef, drawAnimationFrame);

  const init = useCallback(async () => {
    const parent = parentRef.current;
    const videoCanvas = videoCanvasRef.current;
    const signaturePadCanvas = signaturePadCanvasRef.current;

    videoCanvas.width = parent.offsetWidth;
    videoCanvas.height = parent.offsetHeight;

    signaturePadCanvas.width = videoCanvas.offsetWidth;
    signaturePadCanvas.height = videoCanvas.offsetHeight / 3;

    signaturePad.disable();
    signaturePad.fillCanvas();

    await canvasRecordWithUserMedia.startVideo();
  }, [canvasRecordWithUserMedia, signaturePad]);

  const start = useCallback(() => {
    signaturePad.enable();
    canvasRecordWithUserMedia.startRecord();
  }, [canvasRecordWithUserMedia, signaturePad])

  const stop = useCallback(async () => {
    setIsLock(true);
 
    const videoBlob = await canvasRecordWithUserMedia.stopRecord();
    const signaturePadURL = await signaturePad.toDataURL();

    signaturePad.clear();
    signaturePad.fillCanvas();
    signaturePad.disable();
    canvasRecordWithUserMedia.stopVideo();

    onStop(videoBlob, signaturePadURL);
  }, [canvasRecordWithUserMedia, signaturePad, onStop]);

  useEffect(() => {
    const { isReady } = signaturePad;
    const { isCapturing } = canvasRecordWithUserMedia;
    if (isReady && isCapturing === false && !isLock) init();
  }, [signaturePad, canvasRecordWithUserMedia, isLock, init]);

  return (
    <div
      ref={parentRef}
      className={classes.container}
    >
      <canvas
        ref={videoCanvasRef}
        className={classes.canvasVideo}
      />
      <canvas
        ref={signaturePadCanvasRef}
        className={classes.canvasSignature}
      />
      <video
        muted
        ref={videoRef}
        className={classes.video}
      />
      <FloatIconButton
        isRecording={canvasRecordWithUserMedia.isRecording}
        onClick={
          canvasRecordWithUserMedia.isRecording
          ? stop
          : start
        }
      />
    </div>
  )
};

SignatureVideo.propTypes = {
  onStop: PropTypes.func,
};

SignatureVideo.defaultProps = {
  onStop: () => {},
};

export default memo(SignatureVideo);