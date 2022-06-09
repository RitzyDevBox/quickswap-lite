import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import QuickIcon from 'assets/images/quickIcon.svg';
import QuickLogo from 'assets/images/quickLogo.png';
import { ReactComponent as ThreeDotIcon } from 'assets/images/ThreeDot.svg';
import { ReactComponent as LightIcon } from 'assets/images/LightIcon.svg';
import WalletIcon from 'assets/images/WalletIcon.png';
import 'components/styles/Header.scss';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [openDetailMenu, setOpenDetailMenu] = useState(false);
  const theme = useTheme();

  const tabletWindowSize = useMediaQuery(theme.breakpoints.down('sm'));
  const mobileWindowSize = useMediaQuery(theme.breakpoints.down('xs'));
  // const toggleWalletModal = useWalletModalToggle();
  const menuItems = [
    {
      link: '/swap',
      text: t('swap'),
      id: 'swap-page-link',
    },
    {
      link: '/pools',
      text: t('pool'),
      id: 'pools-page-link',
    },
    {
      link: '/farm',
      text: t('farm'),
      id: 'farm-page-link',
    },
    {
      link: '/dragons',
      text: t('dragonLair'),
      id: 'dragons-page-link',
    },
    {
      link: '/convert',
      text: t('convert'),
      id: 'convert-quick',
    },
    {
      link: '/prdt',
      text: 'Predictions',
      id: 'prdt-page-link',
    },
    {
      link: '/analytics',
      text: t('analytics'),
      id: 'analytics-page-link',
    },
  ];

  const outLinks: any[] = [
    // {
    //   link: '/',
    //   text: 'Governance',
    // },
    // {
    //   link: '/',
    //   text: 'Docs',
    // },
    // {
    //   link: '/',
    //   text: 'For Developers',
    // },
    // {
    //   link: '/',
    //   text: 'Help & Tutorials',
    // },
    // {
    //   link: '/',
    //   text: 'Knowledge Base',
    // },
    // {
    //   link: '/',
    //   text: 'News',
    // },
  ];

  return (
    <Box className='header'>
      {/* <WalletModal
        ENSName={ENSName ?? undefined}
        pendingTransactions={pending}
        confirmedTransactions={confirmed}
      /> */}
      <Link to='/'>
        <img
          src={mobileWindowSize ? QuickIcon : QuickLogo}
          alt='QuickLogo'
          height={60}
        />
      </Link>
      {!tabletWindowSize && (
        <Box className='mainMenu'>
          {menuItems.map((val, index) => (
            <Link
              to={val.link}
              key={index}
              id={val.id}
              className={
                pathname.indexOf(val.link) > -1 ? 'active' : 'menuItem'
              }
            >
              <small>{val.text}</small>
            </Link>
          ))}
        </Box>
      )}
      {tabletWindowSize && (
        <Box className='mobileMenuContainer'>
          <Box className='mobileMenu'>
            {menuItems.slice(0, 4).map((val, index) => (
              <Link
                to={val.link}
                key={index}
                className={
                  pathname.indexOf(val.link) > -1 ? 'active' : 'menuItem'
                }
              >
                <small>{val.text}</small>
              </Link>
            ))}
            <Box className='flex menuItem'>
              <ThreeDotIcon
                onClick={() => setOpenDetailMenu(!openDetailMenu)}
              />
              {openDetailMenu && (
                <Box className='subMenuWrapper'>
                  <Box className='subMenu'>
                    {menuItems.slice(4, menuItems.length).map((val, index) => (
                      <Link
                        to={val.link}
                        key={index}
                        className='menuItem'
                        onClick={() => setOpenDetailMenu(false)}
                      >
                        <small>{val.text}</small>
                      </Link>
                    ))}
                    {outLinks.map((item, ind) => (
                      <a
                        href={item.link}
                        key={ind}
                        onClick={() => setOpenDetailMenu(false)}
                      >
                        <small>{item.text}</small>
                      </a>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      {/* <Box>
        <Box className='headerIconWrapper'>
          <Box className='styledPollingDot' />
          <LightIcon />
        </Box>
        {account && (!ethereum || isSupportedNetwork(ethereum)) ? (
          <Box
            id='web3-status-connected'
            className='accountDetails'
            onClick={toggleWalletModal}
          >
            <p>{shortenAddress(account)}</p>
            <img src={WalletIcon} alt='Wallet' />
          </Box>
        ) : (
          // <Box
          //   className={`connectButton ${
          //     ethereum && !isSupportedNetwork(ethereum)
          //       ? 'bg-error'
          //       : 'bg-primary'
          //   }`}
          //   onClick={() => {
          //     if (!ethereum || isSupportedNetwork(ethereum)) {
          //       toggleWalletModal();
          //     }
          //   }}
          // >
          //   {ethereum && !isSupportedNetwork(ethereum)
          //     ? 'Wrong Network'
          //     : 'Connect Wallet'}
          //   {ethereum && !isSupportedNetwork(ethereum) && (
          //     <Box className='wrongNetworkWrapper'>
          //       <Box className='wrongNetworkContent'>
          //         <small>{t('switchWalletToPolygon')}</small>
          //         <Box mt={2.5} onClick={addMaticToMetamask}>
          //           {t('switchPolygon')}
          //         </Box>
          //       </Box>
          //     </Box>
          //   )}
          // </Box>
        )}
      </Box> */}
    </Box>
  );
};

export default Header;
