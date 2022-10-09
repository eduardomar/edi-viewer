import { useMemo } from 'react';
import { useParams as useParamsRouter } from 'react-router-dom';

const useParams: any = () => {
  const params = useParamsRouter() ?? {};
  const str = JSON.stringify(params);

  return useMemo(() => {
    const strDecoded = decodeURIComponent(str);

    return JSON.parse(strDecoded);
  }, [str]);
};

export default useParams;
