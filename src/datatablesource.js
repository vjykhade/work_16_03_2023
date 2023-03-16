export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "fullname",
      headerName: "FullName",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.fullname}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "address",
      headerName: "Address",
      width: 100,
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

export const productColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "producttitle",
      headerName: "ProductTitle",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.producttitle}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 230,
    },
  
    {
      field: "desc",
      headerName: "Description",
      width: 100,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  