module.exports = (server) => {

    // INDEX ===============================================================

    require('./index/index')(server);
    require('./index/contact')(server);
    // SHOP -------
    require('./index/shop/shop')(server);
    require('./index/shop/checkout')(server);

    // LOGIN ===============================================================

    require('./login/google')(server);
    require('./login/login')(server);
    require('./login/register')(server);

    // PROFILE =============================================================
    
    require('./index/profile/profile')(server)
    require('./index/profile/profileSupport')(server)
    require('./index/profile/shippingInfo')(server)
    require('./index/profile/profileHistory')(server)

    // ADMIN ===============================================================
    
    // require('./admin/adminDashboard')(server);
    // require('./admin/adminProducts')(server);
    // require('./admin/adminUsers')(server);
    // require('./admin/adminSupport')(server);
}