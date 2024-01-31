/* eslint-disable filenames/match-exported */
import { Container, Typography } from '@mui/material';

import styles from './page.module.scss';

const HomePage = (): React.ReactElement => {
  return (
    <Container>
      <Typography className={styles.title} variant="h1">
        Disappearing Messages
      </Typography>
    </Container>
  );
};

export default HomePage;
