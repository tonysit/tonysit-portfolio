import * as React from 'react';

export default function useAnimateNumber(max, start = false, min = 0, dis = 10, ms = 10) {
  const [progress, setProgress] = React.useState(min);
  let timer = 0;
  
  React.useEffect(() => {
      if(start){
        timer = setInterval(() => {
          setProgress((prevProgress) => {
              if(prevProgress >= max){
                  clearInterval(timer);
                  return max;
              }
              return prevProgress + dis;
          });
        }, ms);
      }
    return () => {
        clearInterval(timer);
    };
}, [start]);

  return [progress, setProgress];
}