export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/vanbang',
		name: 'Sổ tốt nghiệp',
		icon: 'MenuUnfoldOutlined',
		routes: [
			{
				path: '/vanbang/Sovanbang',
				name: 'Sổ văn bằng ',
				component: './Vanbang/Sovanbang',
				
			},
			{
				path: '/vanbang/Quyetdinhtotnghiep',
				name: 'Quyết định tốt nghiệp ',
				component: './Vanbang/Quyetdinhtotnghiep',
				
			},
			
			{
				path: '/vanbang/Thongtinvanbang',
				name: 'Thông tin văn bằng',
				component: './Vanbang/Thongtinvanbang',
				
			},
			{
				path: '/vanbang/Cauhinhtruongthongtin',
				name: 'Cấu hình trường thông tin',
				component: './Vanbang/Cauhinhtruongthongtin',
				
			},
			{
				path: '/vanbang/Tracuuthongtin',
				name: 'Tra cứu thông tin',
				component: './Vanbang/Tracuuthongtin',
				
			},
		],
	},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
