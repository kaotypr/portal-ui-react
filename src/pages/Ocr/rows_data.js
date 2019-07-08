const rows_data = [
  { 
    key: 'id_perusahaan',
    align: 'left',
    disablePadding: false,
    label: 'ID Client',
    filter: ''
  },
  { 
    key: 'nama',
    align: 'right',
    disablePadding: false,
    label: 'Nama Client',
    filter: ''
  },
  { 
    key: 'nomor_telepon',
    align: 'left',
    disablePadding: false,
    label: 'Nomor Telepon',
    filter: ''
  },
  {
    key: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    filter: ''
  },
  { 
    key: 'status',
    align: 'right',
    disablePadding: false,
    label: 'Status',
    filter: '',
    getval: (val) => (val === true) ? 'Sukses' : 'Gagal',
    selects: [
      {
        value: true,
        label: 'Sukses'
      },
      {
        value: false,
        label: 'Gagal'
      }
    ]
  }
]

export default rows_data