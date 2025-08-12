import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, productAdd } from '../../api.jsx';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import './main.css'

function MainMenu() {
  const [products, setProducts] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
  });

  const getData = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Couldnt load products', error);
    }
  };

  const handleDelete = async (name) => {
      await deleteProduct(name);
      await getData(); 
  };

  const columns = [
    {
      accessorKey: 'name',
      header: () => 'Name',
      cell: info => info.getValue()
    },
    {
      accessorKey: 'price',
      header: () => 'Price(per kg)',
      cell: info => info.getValue()+' rub.'
    },
    {
      accessorKey: 'quantity',
      header: () => 'Quantity(kg)',
      cell: info => info.getValue()
    },
    {
      id: 'actions',
      header: () => 'Actions',
      cell: ({ row }) => (
        <button
          style={{ color: 'white', background: 'gray', border: 'none' }}
          onClick={() => handleDelete(row.original.name)}
        >
          Delete
        </button>
      )
    }
  ];

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5
      }
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    productAdd({
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    }).then(() => {
      getData(); 
    });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="main">
      <h2 style={{alignItems:'center'}}>List of products</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} placeholder="Name" />
        <input type="number" step="any" name="price" onChange={handleChange} placeholder="Price" />
        <input type="number" name="quantity" onChange={handleChange} placeholder="Quantity" />
        <button type="submit">Add to table</button>
      </form>

      {products.length === 0 ? (
        <p>List is empty</p>
      ) : (
        <>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽'
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '10px' }}>
            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              {'<<'}
            </button>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              {'<'}
            </button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              {'>'}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span style={{ marginLeft: '10px' }}>
              Page{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
              style={{ marginLeft: '10px' }}
            >
              {[5, 10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}

export default MainMenu;
