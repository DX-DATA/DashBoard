module.exports = {
	devServer: {
        proxy: { 
            '/api': { 
                target: 'http://localhost:3333/', 
                changeOrigin: true, 
                pathRewrite:{ "^/api" : '' } 
            },
            '/socket': { 
                target: 'http://127.0.0.1:3333/', 
                changeOrigin: true, 
                pathRewrite:{ "^/socket" : '' },
                ws: false
            } 
        },
		headers: { "Access-Control-Allow-Origin": "*" }
	}
}