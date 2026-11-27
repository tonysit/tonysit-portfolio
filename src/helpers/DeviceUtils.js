const userAgent = navigator.userAgent;

export const isSafari = !!userAgent.match(/Version\/[\d\.]+.*Safari/);

export const iOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

export const isChromeIOS = iOS && /CriOS\//i.test(userAgent);

export const Android = /Android/.test(userAgent);
