import { useMemo } from 'react';
import { useParams as useParamsRouter } from 'react-router-dom';

const useParams: any = () => {
  const params = useParamsRouter() ?? {};
  const str = JSON.stringify(params);

  return useMemo(() => {
    console.log('🚀 ~ useParams.tsx', { str });

    return JSON.parse(str);
  }, [str]);
};

export default useParams;
