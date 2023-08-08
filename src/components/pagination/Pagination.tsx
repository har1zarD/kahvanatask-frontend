interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='flex justify-center mt-4'>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`mx-1 px-3 py-1 rounded-lg ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
