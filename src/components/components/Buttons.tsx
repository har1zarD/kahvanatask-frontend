type Props = {
  src: string;
  alt: string;
  onClick: () => void;
};

const Buttons: React.FC<Props> = ({ src, alt, onClick }) => {
  return (
    <div>
      <button className='icon-container transform transition-transform hover:scale-125' onClick={onClick}>
        <img src={src} alt={alt} className='text-white w-6 h-6' />
      </button>
    </div>
  );
};

export default Buttons;
