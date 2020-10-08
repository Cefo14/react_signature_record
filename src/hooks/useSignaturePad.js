import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import Signature_Pad from 'signature_pad';

/**
 * 
 * @param {React.MutableRefObject<HTMLCanvasElement>} canvas
 * @param {String} backgroundColor
 */
const useSignaturePad = (canvas, backgroundColor = 'rgba(0, 0, 0, 0)') => {
  const [signaturePad, setSignaturePad] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const toDataURL = useCallback(() => (
    signaturePad.toDataURL()
  ), [signaturePad]);

  const clear = useCallback(() => (
    signaturePad.clear()
  ), [signaturePad]);

  const isEmpty = useCallback(() => (
    signaturePad.isEmpty()
  ), [signaturePad]);

  const enable = useCallback(() => (
    signaturePad.on()
  ), [signaturePad]);

  const disable = useCallback(() => (
    signaturePad.off()
  ), [signaturePad]);

  const fillCanvas = useCallback((_backgroundColor) => {
    const _canvas = canvas.current;
    const lobalBackgroundColor = _backgroundColor || backgroundColor;
    const context = _canvas.getContext('2d');
    context.fillStyle = lobalBackgroundColor;
    context.fillRect(0, 0, _canvas.width, _canvas.height);
  }, [canvas, backgroundColor]);

  useEffect(() => {
    const _signaturePad = new Signature_Pad(canvas.current);
    setSignaturePad(_signaturePad);
    setIsReady(true);
  }, [canvas]);

  return useMemo(() => ({
    signaturePad,
    toDataURL,
    clear,
    isEmpty,
    enable,
    disable,
    fillCanvas,
    isReady,
  }), [
    signaturePad,
    toDataURL,
    clear,
    isEmpty,
    enable,
    disable,
    fillCanvas,
    isReady,
  ]);
};

export default useSignaturePad;