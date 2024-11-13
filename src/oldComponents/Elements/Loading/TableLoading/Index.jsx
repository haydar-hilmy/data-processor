import RowTableLoading from "./RowTableLoading";

const TableLoading = (props) => {
    const { totalRow = 5, isShow = false } = props;
    
    return (
        <>
            {isShow && (
                [...Array(totalRow)].map((_, index) => (
                    <div key={index} className="py-2 px-2 w-full gap-4 flex flex-row">
                        <RowTableLoading />
                    </div>
                ))
            )}
        </>
    );
};

export default TableLoading