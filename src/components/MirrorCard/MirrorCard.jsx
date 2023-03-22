import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  Avatar,
  ActionIcon,
} from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

const avatars = [
  'https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
];

const MirrorCard = ({
  image,
  title,
  description,
  handlePreview,
  handleEdit,
  handleDelete,
}) => {
  const { classes } = useStyles();

  return (
    <Card shadow="xl" radius="xs" p="lg" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={100} />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text size="sm" weight={700}>
          {title}
        </Text>
      </Group>
      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {description}
      </Text>
      <Group className={classes.footer} position="apart" mt="md">
        <Avatar.Group spacing="sm">
          <Avatar src={avatars[0]} radius="xl" />
          <Avatar src={avatars[1]} radius="xl" />
          <Avatar src={avatars[2]} radius="xl" />
          <Avatar radius="xl">+5</Avatar>
        </Avatar.Group>

        <ActionIcon
          onClick={handleDelete}
          variant="default"
          size={32}
          style={{ marginLeft: 'auto' }}
        >
          <IconTrash color="red" size={18} />
        </ActionIcon>

        <ActionIcon onClick={handlePreview} variant="default" size={32}>
          <IconEye size={18} />
        </ActionIcon>

        <ActionIcon onClick={handleEdit} variant="default" size={32}>
          <IconEdit size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default MirrorCard;
