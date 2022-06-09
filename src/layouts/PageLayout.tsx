import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Header, Footer, BetaWarningBanner } from 'components';
import Background from './Background';

export interface PageLayoutProps {
  children: any;
  name?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, name }) => {
  const history = useHistory();

  const getPageWrapperClassName = () => {
    return name == 'prdt' ? 'pageWrapper-no-max' : 'pageWrapper';
  };
  return (
    <Box className='page'>
      <BetaWarningBanner />
      <Header />
      <Background fallback={false} />
      <Box className={getPageWrapperClassName()}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default PageLayout;
