type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  type: any;
};

const Inputs = ({ name, value, type, onChange, placeholder }: Props) => {
  return (
    <div>
      <label className='block mb-2 mt-2'>{name}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='w-full p-2 border rounded'
        required
      />
    </div>
  );
};

export default Inputs;
