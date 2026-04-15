import React from 'react'

const Header = ({
    pageTitle,
    actions,
    search,
    setSearch,
    openAdd,
    description
}) => {
    return (
        <div className="topbar">
            <div>
                <h1 className="page-title">{pageTitle}</h1>
                <p style={{fontSize:12,color:'var(--text-light)',fontWeight:700,marginTop:2}}>{description == null ? "" : description}</p>
            </div>
            {
                actions && (
                    <div className="topbar-actions">
                <input className="search-input" placeholder="🔍 Search..." value={search}
                    onChange={e => setSearch(e.target.value)} />
                <button className="btn-primary" onClick={openAdd}>＋ Add Product</button>
            </div>
                )
            }
            
        </div>
    )
}

export default Header