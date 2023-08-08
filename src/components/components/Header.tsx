type Props = {
  name: string;
};

const Header = ({ name }: Props) => {
  return (
    <header className='bg-gray-800 text-white text-center py-4'>
      <h1 className='text-2xl font-semibold'>{name}</h1>
    </header>
  );
};

export default Header;
