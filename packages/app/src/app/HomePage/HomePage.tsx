import { Container, Stack, Typography } from '@mui/material';

import AddForm from './AddForm';
import styles from './HomePage.module.scss';

const HomePage = (): React.ReactElement => {
  return (
    <Container>
      <Stack py={2} spacing={4}>
        <Typography className={styles.title} variant="h1">
          Disappearing Messages
        </Typography>
        <AddForm />
      </Stack>
    </Container>
  );
};

export default HomePage;
