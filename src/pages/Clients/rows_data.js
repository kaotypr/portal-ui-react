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
  // { 
  //   key: 'pic',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'PIC',
  //   filter: ''
  // },
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
    key: 'status_client',
    align: 'right',
    disablePadding: false,
    label: 'Status',
    filter: '',
    getval: (val) => (val === true) ? 'Aktif' : 'Tidak Aktif',
    selects: [
      {
        value: true,
        label: 'Aktif'
      },
      {
        value: false,
        label: 'Tidak Aktif'
      }
    ]
  }
]

export default rows_data