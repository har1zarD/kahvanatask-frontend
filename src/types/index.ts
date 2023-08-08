type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  [key: string]: string;
};

type TbodyProps = {
  users: User[];
  onEditClick: (user: User) => void;
  onDeleteClick: (id: string) => void;
};

export type { User, TbodyProps };
