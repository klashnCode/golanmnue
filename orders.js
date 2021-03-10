$(function () {
    const database = firebase.database();
    const beforeQuery = database.ref('orders/');


    /************************** */
    beforeQuery.on('value', function success(data) {
        if (data) {
            let orders = '';
            $.each(data.val(), function (key, value) {
                let oreder_number = key,
                    oreder_total = value.total,
                    total_products = value.products,
                    table = value.table;

                orders += `<div class="order-id">${oreder_number}
                                <span class="order-total">ש${oreder_total}</span>
                                <span class="order-total" style="margin-left: 35px; margin-right: 45px;">${table}</span>
                                </div>
                                <div class="order-details">`;
                $.each(total_products, function (key, value) {
                    orders += `<div>${value.item} | ${value.price}</div>`
                });
                orders += `</div>`;
            });
            $('.append-orders').html(orders);
        }
    });
    $(document).on('click', '.order-id', function () {
        $(this).next('.order-details').slideToggle();
    })
});
