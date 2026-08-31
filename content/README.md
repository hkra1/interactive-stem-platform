# Content Directory

This folder is the source of truth for learning modules.

## Recommended Structure

```
content/
├── math/
│   ├── calculus-1/
│   │   ├── index.mdx
│   │   ├── limits.ipynb
│   │   └── assets/
│   └── ...
├── physics/
│   ├── mechanics/
│   │   ├── index.mdx
│   │   ├── projectile.py   # or .ipynb
│   │   └── ...
├── chemistry/
├── cs-data/
└── meta/
    └── courses.json        # optional course catalog
```

## Formats Supported (MVP target)

- **MDX** – primary lesson format (Markdown + React components for interactive widgets)
- **Jupyter Notebooks (.ipynb)** – rendered via JupyterLite or a custom Pyodide-powered viewer
- Static assets (images, data files, 3D models)

## Authoring Tips

- Keep interactive cells focused and fast-loading.
- Prefer client-side execution (Pyodide) over server round-trips.
- Use clear learning objectives at the top of each module.
- Include quick formative checks (multiple choice, short code exercises).

Contributions of high-quality modules are very welcome via Pull Request!
