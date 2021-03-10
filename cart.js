
$(document).ready(function () {
    const database = firebase.database();
    const beforeQuery = database.ref('menu/')
    const beforecartQuery = database.ref('orders/')

    /************* */


    /******************** */


    beforeQuery.on('value', function success(data) {
        if (data) {
            let category1 = '',
                category2 = '',
                category3 = '',
                category4 = '';

            $.each(data.val(), function (key, value) {
                let id = key,
                    category = value['category'],
                    title = value['title'],
                    price = value['price'],
                    image = value['image'];

                if (category == 'category1') {
                    category1 += `<div class="product-box">
                    <div id= ${key}>
                    <img class="image" src=${image}>
                    <img class="title">${title}</div><hr>
                    <div class="price" id="pri">${parseFloat(price).toFixed(2)} ש</div><hr>
                    <div data-id=${key} class="add-to-cart" id="add-to-cart"><img class="cart-icon" src="img/cart.png"></div>

                    </div>
                    </div>
                          `;
                } else if (category == 'category2') {
                    category2 += `<div class="product-box">
                    <div id= ${key}>
                    <img class="image" src=${image}>
                    <img class="title">${title}</div><hr>
                    <div class="price" id="pri">${parseFloat(price).toFixed(2)} ש</div><hr>
                    <div data-id=${key} class="add-to-cart" id="add-to-cart"><img class="cart-icon" src="img/cart.png"></div>

                    </div>
                    </div>
                          `;
                } else if (category == 'category3') {
                    category3 += `<div class="product-box">
                    <div id= ${key}>
                    <img class="image" src=${image}>
                    <img class="title">${title}</div><hr>
                    <div class="price" id="pri">${parseFloat(price).toFixed(2)} ש</div><hr>
                    <div data-id=${key} class="add-to-cart" id="add-to-cart"><img class="cart-icon" src="img/cart.png"></div>

                    </div>
                    </div>
                          `;
                } else if (category == 'category4') {
                    category4 += `<div class="product-box">
                    <div id= ${key}>
                    <img class="image" src=${image}>
                    <img class="title">${title}</div><hr>
                    <div class="price" id="pri">${parseFloat(price).toFixed(2)} ש</div><hr>
                    <div class="add-to-cart" data-id=${key} id="add-to-cart"><img class="cart-icon" src="img/cart.png"></div>
                    </div>
                    </div>
                          `;
                }

            });
            $('.category1').html(category1);
            $('.category2').html(category2);
            $('.category3').html(category3);
            $('.category4').html(category4);

            /*
                        var rolIV;
                        function Ready(){
                            rolIV = document.getElementById('pri').value;
                        }
                    document.getElementById('add-to-cart').onclick = function(){
                        Ready();
                        
                        firebase.database().ref('menu/'+rolIV).on('value',function(snapshot){
                            document.getElementById('pri').value = snapshot.val().price;
                        });
                        
                          
                       
                    }
            
            */
            $('.add-to-cart').click(function () {
                let thekey = $(this).data('id');
                firebase.database().ref('menu/' + thekey).on('value', function (snapshot) {
                    let appenddata = `
                             <tr>
                             <td class="carttitle">${snapshot.val().title}</td>
                             <td class="cartprice">${snapshot.val().price} ש</td>
                             <td class="removeme">X</td>
                             </tr>`;
                    $('.cart').append(appenddata);
                });
                /*
                                var x = document.getElementById("mytable").value;
                                console.log(x)
                                
                                                let thekey = $(this).data('id');
                                                let title = $(`#${thekey} > .title`).text(),
                                                    price = $(`#${thekey} > .price`).text(),
                                                    slice = price.indexOf('.');
                                
                                                price = price.slice(0, slice);
                                
                                                console.log("title:", title);
                                                console.log("price:", parseFloat(price).toFixed(2));
                                                let appenddata = `
                                                         <tr>
                                                             <td class="carttitle">${title}</td>
                                                             <td class="cartprice">${parseFloat(price).toFixed(2)} ש</td>
                                                             <td class="removeme">X</td>
                                                             </tr>`;
                                                $('.cart').append(appenddata);
                                */





            });


            $('.cart-toggle').click(function () {
                $('.cart-container').slideToggle("slow");
            })


            $(document).on('click', '.removeme', function () {

                $(this).parent().remove();
            });

            $(document).on('click', '.removeme,.cart-icon', function () {
                total();
                let totalrows = $('.cartprice').length,
                    itemcounter = $('.totalitems');
                itemcounter.fadeOut('slow', function () {
                    $(this).html(totalrows).fadeIn('slow');
                })

            });

            const total = () => {
                let allcareproduct = $('.cartprice'),
                    total = 0;
                for (let i = 0; i < allcareproduct.length; i++) {
                    var getprice = $('.cartprice').eq(i).text();
                    total += parseInt(getprice);
                }
                $('.total').text(`Total : ${parseFloat(total).toFixed(2)} ש`);
                if (total > 1) {
                    $('.send-oreder').slideDown();
                } else {
                    $('.send-oreder').slideUp();
                }
                return total;
            }

            /**send order */

            $(document).on('click', '.send-oreder', function () {
                var oredereditems = [];
                let totalrows = $('.cartprice').length;

                for (let i = 0; i < totalrows; i++) {
                    var items =
                    {
                        item: $('.carttitle').eq(i).text(),
                        price: $('.cartprice').eq(i).text(),
                    }
                    oredereditems.push(items);
                }


                let newid = beforecartQuery.push();
                newid.set({
                    products: oredereditems,
                    total: total(),
                    table: document.getElementById("mytable").value,
                },


                    function (error) {
                        if (!error) {
                            $('.removeme').click();
                            /**'<tr><td colspan="3">Order Set Successfully</td></tr>' */
                            $('.cart').append(alert("Order Set Successfully"));
                            setTimeout(function () {
                                $('.cart-toggle').click();
                            }, 2500);
                        }
                    });

            });





        } else { console.log('NO data Found') }




    });


});
