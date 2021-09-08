{
    "version": 2,
        "routes": [
            {
                "src": "^/service-worker.js$",
                "dest": "/_next/static/service-worker.js",
                "headers": {
                    "cache-control": "public, max-age=43200, immutable",
                    "Service-Worker-Allowed": "/"
                }
            }
        ],
            "builds": [
                {
                    "src": "next.config.js",
                    "use": "@now/next"
                }
            ]
}