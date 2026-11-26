export const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

export const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export const Android = /Android/.test(navigator.userAgent);