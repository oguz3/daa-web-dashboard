import { Box, Container, createStyles, Text, Title } from '@mantine/core';
import { useAuthContext } from '@context/authContext';

const useStyles = createStyles((theme, _params) => {
  return {
    banner: {
      position: 'relative',
      background:
        'linear-gradient(87.93deg, #d8ecfac9 3.83%, #228be6b0 87.25%)',
    },

    content: {
      padding: '40px 0px 60px 0px',
    },

    image: {
      position: 'absolute',
      right: '-32px',
      top: '0px',
      maxWidth: '250px',
      height: 'auto',
    },
  };
});

const WelcomeBanner = () => {
  const { classes } = useStyles();
  const { user } = useAuthContext();

  return (
    <Box className={classes.banner}>
      <Container pos="relative">
        <Box className={classes.content}>
          <Text fz="md">Hi {user?.nameSurname || ''}</Text>
          <Title fz="32px" ff="Inter, sans-serif">
            Welcome to Magic Mirror!
          </Title>
          <Text fz="sm" mt="12px" w="80%" c="#495057">
            Project activity will be updated here. Click on the name section to
            set your configuration. Project activity will be updated here. Click
            on the name section to set your configuration.
          </Text>
        </Box>

        <img
          className={classes.image}
          src="/assets/banner-bg.png"
          alt="bg-image"
        />
      </Container>
    </Box>
  );
};

export default WelcomeBanner;
