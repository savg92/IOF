interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isVisible, onClose, children }: ModalProps): JSX.Element | null => {
  if (!isVisible) return null;

  const handleClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const target = e.target as HTMLDivElement;
    if (target.id === 'wrapper') onClose();
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10'
      id='wrapper'
      onClick={handleClose}
    >
      <div className='flex flex-col'>
        {/* <button
          className='text-white text-xl place-self-end'
          onClick={() => onClose()}
        >
          X
        </button>
        <div className='bg-white p-2 rounded text-black'>
            {children}
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;