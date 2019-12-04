process.env.NTBA_FIX_319 = 1;
const bcrypt = require('bcrypt');
var $ = require('axios');
const connection = require('./connect');
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '1064481593:AAGw52tBR4Ga_kTlk7LzfbrpJXN2LAC7FWs';
console.log('Bot has been started...');
let bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    },
 

});
bot.on('message',  msg=> {

    if (msg.text === '/start') {
        connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
            function (err, tguser) {
                if (err)
                    console.log('Error');
                else
                    console.log("Great");

                if (tguser.length === 0) {
                    connection.query("INSERT INTO `tgusers`(`chatid`, `status`) " + "VALUES (?,?)", [msg.chat.id, 0],
                        function (err) {
                            if (err)
                                console.log(err);
                            else
                                console.log("Great");
                        });
                }
            });
        connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [0,  msg.chat.id],
            function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("Great");
            });

        bot.sendMessage(msg.chat.id, 'Зравствуй, ' + msg.chat.first_name + '. Сыграешь в шахматы?   (Да/Нет)')
            .then(() => {
                console.log('Message has been send');
                connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [1, msg.chat.id],
                    function (err) {
                        if (err)
                            console.log(err);
                        else
                            console.log("Great");
                    });


            })
            .catch(() => {
                console.error(error)
            })
    }

    connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
        function (err, tguser) {
            if (err)
                console.log('Error');
            else
                console.log("Great");



                    if (tguser[0].status === 1) {
                        if (msg.text === 'Да'||msg.text ==='да'||msg.text ==='ДА'|| msg.text === '+') {
                            console.log(msg.text);
                            bot.sendMessage(msg.chat.id, 'Отлично. Вы уже зарегистрированы на сайте chess.ru ?    (Да/Нет)')
                                .then(() => {
                                    console.log('Message has been send');
                                    connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [2, msg.chat.id],
                                        function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("Great");
                                        });

                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        } else if (msg.text === 'Нет' ||msg.text ==='-'||msg.text ==='НЕТ'|| msg.text === 'нет') {
                            bot.sendMessage(msg.chat.id, 'Это печально... До встречи!')
                                .then(() => {
                                    console.log('Message has been send');
                                    connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [0, msg.chat.id],
                                        function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("Great");
                                        });
                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        } else {
                            bot.sendMessage(msg.chat.id, 'Неправильная команда, попробуйте еще раз')
                                .then(() => {
                                    console.log('Message has been send');
                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        }
                    }
                    if (tguser[0].status === 2) {
                        if (msg.text === 'Да'||msg.text ==='да'||msg.text ==='ДА'|| msg.text === '+') {
                            bot.sendMessage(msg.chat.id, 'Тогда вам следует авторизоваться! Введите ваш логин: ')
                                .then(() => {
                                    console.log('Message has been send');
                                    connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [2.1, msg.chat.id],
                                        function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log('great');
                                        });

                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        } else if (msg.text === 'Нет' ||msg.text ==='-'||msg.text ==='НЕТ'|| msg.text === 'нет') {
                            bot.sendMessage(msg.chat.id, 'В таком случае зарегистрируйтесь. Введите ваш будущий логин: ')
                                .then(() => {
                                    console.log('Message has been send');
                                    connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [2.2, msg.chat.id],
                                        function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("Great");
                                        });

                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        } else {
                            bot.sendMessage(msg.chat.id, 'Неправильная команда, попробуйте еще раз')
                                .then(() => {
                                    console.log('Message has been send');

                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        }

                    }
                    if (tguser[0].status === 2.1) {

                        bot.sendMessage(msg.chat.id, 'Теперь введите ваш пароль:   ')
                            .then(() => {
                                console.log('Message has been send');
                                connection.query(" UPDATE tgusers SET status=?, login=? WHERE chatid = ? ", [2.11, msg.text, msg.chat.id],
                                    function (err) {
                                        if (err)
                                            console.log(err);
                                        else
                                            console.log("Great");
                                    });


                            })
                            .catch(() => {
                                console.error(error)
                            })

                    }
                    if (tguser[0].status === 2.11) {

                        connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                            function (err, tguser) {
                                if (err)
                                    console.log('Error');
                                else
                                    console.log("Great");

                                connection.query("SELECT * FROM users " + "WHERE username= ? ", [tguser[0].login],
                                    function (err, user) {
                                        if (err)
                                            console.log('Error');
                                        else
                                            console.log("Great");
                                        console.log(user);
                                        if (user.length != 0) {
                                            hash = user[0].password;
                                            hash = hash.replace('$2y$', '$2b$');
                                            bcrypt.compare(msg.text, hash).then(function (res) {
                                                if (res) {
                                                    bot.sendMessage(msg.chat.id, 'Доброго времени суток,' +tguser[0].login+'. Желаете начать поиск ?  (Да/Нет) ')
                                                        .then(() => {
                                                            console.log('Message has been send');
                                                            connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [3, msg.chat.id],
                                                                function (err) {
                                                                    if (err)
                                                                        console.log(err);
                                                                    else
                                                                        console.log("Great");
                                                                });


                                                        })
                                                        .catch(() => {
                                                            console.error(error)
                                                        })
                                                } else {
                                                    bot.sendMessage(msg.chat.id, 'Вы ввели неправильный логин или пароль. Попрбовать еще раз?   (Да/Нет) ')
                                                        .then(() => {
                                                            console.log('Message has been send');
                                                            connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [2, msg.chat.id],
                                                                function (err) {
                                                                    if (err)
                                                                        console.log(err);
                                                                    else
                                                                        console.log("Great");
                                                                });

                                                        })
                                                        .catch(() => {
                                                            console.error(error)
                                                        })
                                                }


                                            });
                                        } else {
                                            bot.sendMessage(msg.chat.id, 'Вы ввели неправильный логин или пароль. Попробовать еще раз?   (Да/Нет)')
                                                .then(() => {
                                                    console.log('Message has been send');
                                                    connection.query(" UPDATE tgusers SET status=?, login=? WHERE chatid = ? ", [2, msg.text, msg.chat.id],
                                                        function (err) {
                                                            if (err)
                                                                console.log(err);
                                                            else
                                                                console.log("Great");
                                                        });

                                                })
                                                .catch(() => {
                                                    console.error(error)
                                                })

                                        }
                                    }
                                );
                            });

                    }
                    if (tguser[0].status === 2.2) {

                        bot.sendMessage(msg.chat.id, 'Введите ваш пароль:   ')
                            .then(() => {
                                console.log('Message has been send');
                                connection.query(" UPDATE tgusers SET status=?, login=? WHERE chatid = ? ", [2.3, msg.text, msg.chat.id],
                                    function (err) {
                                        if (err)
                                            console.log(err);
                                        else
                                            console.log("Great");
                                    });

                            })
                            .catch(() => {
                                console.error(error)
                            })


                    }
                    if (tguser[0].status === 2.3) {

                        bot.sendMessage(msg.chat.id, 'Введите ваш пароль ещё один раз:   ')
                            .then(() => {
                                console.log('Message has been send');
                                bcrypt.genSalt(10, function (err, salt) {
                                    bcrypt.hash(msg.text, salt, function (err, hash) {
                                        hash = hash.replace('$2b$', '$2y$');
                                        connection.query(" UPDATE tgusers SET status=?, pas1=? WHERE chatid = ? ", [2.4, hash, msg.chat.id],
                                            function (err) {
                                                if (err)
                                                    console.log(err);
                                                else
                                                    console.log("Great");
                                            });
                                    });
                                });


                            })
                            .catch(() => {
                                console.error(error)
                            })


                    }
                    if (tguser[0].status === 2.4) {
                        connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                            function (err, tguser) {
                                if (err)
                                    console.log('Error');
                                else
                                    console.log("Great");
                                tguser[0].pas1 = tguser[0].pas1.replace('$2y$', '$2b$');
                                bcrypt.compare(msg.text, tguser[0].pas1).then(function (res) {
                                    if (res) {
                                       connection.query("SELECT * FROM users " + "WHERE username= ? ", [tguser[0].login],
                                            function (err, user) {
                                                if (err)
                                                    console.log('Error');
                                                else
                                                    console.log("Great");
                                                console.log(user);
                                                if (user.length === 0) {
                                                    tguser[0].pas1 = tguser[0].pas1.replace('$2b$', '$2y$');
                                                    connection.query("INSERT INTO USERS (username, password, wins,loses,draws, gameid ,rating)" + "VALUES (?,?,?,?,?,?,?)", [tguser[0].login, tguser[0].pas1, 0, 0, 0, 0, 0],
                                                        function (err) {
                                                            if (err)
                                                                console.log('Error');
                                                            else
                                                                console.log("Great");
                                                            bot.sendMessage(msg.chat.id, 'Отлично, вы были успешно зарегистрированы. Готовы начать поиск игры?  (Да/Нет)')
                                                                .then(() => {
                                                                    console.log('Message has been send');
                                                                    connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [3, msg.chat.id],
                                                                        function (err) {
                                                                            if (err)
                                                                                console.log(err);
                                                                            else
                                                                                console.log("Great");
                                                                        });

                                                                })
                                                                .catch(() => {
                                                                    console.error(error)
                                                                })

                                                        });
                                                } else {
                                                    bot.sendMessage(msg.chat.id, 'Пользователь с таким именем уже существует. Попробуете еще раз? (Да/Нет)')
                                                        .then(() => {
                                                            console.log('Message has been send');
                                                            connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [2.5, msg.chat.id],
                                                                function (err) {
                                                                    if (err)
                                                                        console.log(err);
                                                                    else
                                                                        console.log("Great");
                                                                });

                                                        })
                                                        .catch(() => {
                                                            console.error(error)


                                                        });
                                                }
                                            });


                                    } else
                                        bot.sendMessage(msg.chat.id, 'Пароли не совпадают. Попробовать еще раз? (Да/Нет)')
                                            .then(() => {
                                                console.log('Message has been send');
                                                connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [2.5, msg.chat.id],
                                                    function (err) {
                                                        if (err)
                                                            console.log(err);
                                                        else
                                                            console.log("Great");
                                                    });

                                            })
                                            .catch(() => {
                                                console.error(error)
                                            })

                                });
                            });
                    }
                    if (tguser[0].status === 2.5) {
                        if (msg.text === 'Да'||msg.text ==='да'||msg.text ==='ДА'|| msg.text === '+') {
                            bot.sendMessage(msg.chat.id, 'Введите ваш логин: ')
                                .then(() => {
                                    console.log('Message has been send');
                                    connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [2.2, msg.chat.id],
                                        function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("Great");
                                        });
                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        } else if (msg.text === 'Нет' ||msg.text ==='-'||msg.text ==='НЕТ'|| msg.text === 'нет') {
                            bot.sendMessage(msg.chat.id, 'Эх... Надеюсь, в другой раз получится. Хорошего дня')
                                .then(() => {
                                    console.log('Message has been send');
                                    connection.query(" UPDATE tgusers SET status=? WHERE chatid = ? ", [0, msg.chat.id],
                                        function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("Great");
                                        });
                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        } else {
                            bot.sendMessage(msg.chat.id, 'Неправильная команда, попробуйте еще раз')
                                .then(() => {
                                    console.log('Message has been send');

                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        }

                    }
                    if (tguser[0].status === 3) {
                        if (msg.text === 'Да'||msg.text ==='да'||msg.text ==='ДА'|| msg.text === '+') {
                            bot.sendMessage(msg.chat.id, 'Хорошо. Начинаю поиск противника! ')
                                .then(() => {
                                    console.log('Message has been send');

                                    connection.query("SELECT * FROM boards " + "WHERE status= ? ", [0],
                                        function (err, board) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("Great");

                                            if (board.length != 0) {
                                                connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                                                    function (err, tguser) {
                                                        if (err)
                                                            console.log('Error');
                                                        else
                                                            console.log("Great");
                                                        connection.query(" UPDATE boards SET playertwo=?, status=? WHERE id = ? ", [tguser[0].login, '1', board[0].id],
                                                            function (err) {
                                                                if (err)
                                                                    console.log('Error');
                                                                else
                                                                    console.log("Great");
                                                                connection.query(" UPDATE users SET gameid=? WHERE username = ? ", [board[0].id, tguser[0].login],
                                                                    function (err) {
                                                                        if (err)
                                                                            console.log('Error');
                                                                        else
                                                                            console.log("Great");

                                                                    });
                                                                bot.sendMessage(msg.chat.id, 'Противник найден! Цвет ваших фигур: белый. Игра начнется через 15 секунд. Для того, чтобы совершить ход нужно использовать следующий формат:\n "координата откуда идет фигура" "координата куда идет фигура".\n Например: A2,A3 ')
                                                                    .then(() => {
                                                                        console.log('Message has been send');
                                                                    });
                                                                connection.query(" UPDATE tgusers SET status=?, gamestat=? WHERE chatid = ? ", [3.1, 1, msg.chat.id],
                                                                    function (err) {
                                                                        if (err)
                                                                            console.log(err);
                                                                        else
                                                                            console.log("Great");
                                                                    });

                                                                let idInterval = setInterval(function(){
                                                                connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                                                                    function (err, tguser) {
                                                                        if (err)
                                                                            console.log('Error');
                                                                        else
                                                                            console.log("Great");
                                                                        if (tguser[0].status != 3.1) {
                                                                            clearInterval(idInterval);
                                                                        } else {
                                                                            console.log(idInterval, tguser[0].status);
                                                                            CheckStat();
                                                                        }
                                                                    });


                                                            }, 3000);


                                                            });


                                                    });
                                            } else {
                                                connection.query("INSERT INTO boards (status,figures, playerone, gametime, playeronetime, playertwotime)" + "VALUES (?,?,?,?,?,?)", [0, 'rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR', tguser[0].login, (Date.now() / 1000), 0, 0],
                                                    function (err) {
                                                        if (err)
                                                            console.log(err);
                                                        else
                                                            console.log("Great");
                                                        connection.query("SELECT * FROM boards " + "WHERE playerone= ? AND status=? ", [tguser[0].login, 0],
                                                            function (err, board) {
                                                                if (err)
                                                                    console.log('Error');
                                                                else
                                                                    console.log("Great");
                                                                connection.query(" UPDATE users SET gameid=? WHERE username = ? ", [board[0].id, tguser[0].login],
                                                                    function (err) {
                                                                        if (err)
                                                                            console.log('Error');
                                                                        else
                                                                            console.log("Great");
                                                                        connection.query(" UPDATE tgusers SET status=?, gamestat=? WHERE chatid = ? ", [3.1, 0, msg.chat.id],
                                                                            function (err) {
                                                                                if (err)
                                                                                    console.log(err);
                                                                                else
                                                                                    console.log("Great");
                                                                            });
                                                                        let idInterval = setInterval(function(){
                                                                            connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                                                                                function (err, tguser) {
                                                                                    if (err)
                                                                                        console.log('Error');
                                                                                    else
                                                                                        console.log("Great");
                                                                                    if (tguser[0].status != 3.1) {
                                                                                        clearInterval(idInterval);
                                                                                    } else {
                                                                                        console.log(idInterval, tguser[0].status);
                                                                                        CheckStat();
                                                                                    }
                                                                                });
                                                                            }
                                                                                , 3000);

                                                                    });
                                                            });
                                                    });
                                            }


                                        });

                                });
                        } else if (msg.text === 'Нет' ||msg.text ==='-'||msg.text ==='НЕТ'|| msg.text === 'нет') {
                            bot.sendMessage(msg.chat.id, 'Ну ладно, попробуем позже... ')
                                .then(() => {
                                    console.log('Message has been send');


                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        } else {
                            bot.sendMessage(msg.chat.id, 'Неправильная команда, попробуйте еще раз')
                                .then(() => {
                                    console.log('Message has been send');

                                })
                                .catch(() => {
                                    console.error(error)
                                })
                        }
                    }
                    if (tguser[0].status === 3.1) {
                        connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                            function (err, tguser) {
                                if (err)
                                    console.log('Error');
                                else
                                    console.log("Great");
                                connection.query("SELECT * FROM users " + "WHERE username= ? ", [tguser[0].login],
                                    function (err, user) {
                                        if (err)
                                            console.log('Error');
                                        else
                                            console.log("Great");
                                        console.log(user);
                                        connection.query("SELECT * FROM boards " + "WHERE id= ? ", [user[0].gameid],
                                            function (err, board) {
                                                if (err)
                                                    console.log('Error');
                                                else
                                                    console.log("Great");
                                                let coord = msg.text.split('');
                                                coord[0] = checkCoord(coord[0]);
                                                coord[3] = checkCoord(coord[3]);
                                                coord = coord.map(Number);
                                                console.log(coord);
                                                let fromCoord = coord[0]+(coord[1]-1)*8;
                                                let toCoord = coord[3]+(coord[4]-1)*8;

                                                console.log(fromCoord,toCoord);
                                                $.get('http://localhost/chess.ru/chess.php?moveFigure' +
                                                    '&fromCoord=' + (fromCoord-1) +
                                                    '&toCoord=' + (toCoord-1) + '&gameid=' + board[0].id +'&playername=' + tguser[0].login)
                                                    .then(function (response) {
                                                    })
                                                    .catch(function (error) {
                                                    });
                                                $.get('http://localhost/chess.ru/chess.php?changeStat' +
                                                   '&gameid=' + board[0].id )
                                                    .then(function (response) {
                                                        console.log(response)
                                                    })
                                                    .catch(function (error) {

                                                    });




                                            });
                                    });
                            });

                    }


            });


    let CheckStat = function (){
        connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
            function (err, tguser) {
                if (err)
                    console.log('Error');
                else
                    console.log("Great");
                connection.query("SELECT * FROM users " + "WHERE username= ? ", [tguser[0].login],
                    function (err, user) {
                        if (err)
                            console.log('Error');
                        else
                            console.log("Great");
                        connection.query("SELECT * FROM boards " + "WHERE id= ? ", [user[0].gameid],
                            function (err, board) {
                                if (err)
                                    console.log('Error');
                                else
                                    console.log("Great");


                                   console.log(board[0].status, tguser[0].gamestat);
                                if (board[0].status != tguser[0].gamestat) {
                                    ShowFigures(board[0].id);
                                }
                            });
                    });
            });



    }
    let ShowFigures  =  function (id) {
        connection.query("SELECT * FROM boards " + "WHERE id= ? ", [id],
            function (err, board) {
                let map = board[0].figures.split('');
                for (let i = 0; i < map.length; i++) {
                    map[i] = ChessSymbol(map[i]);

                }
                let TGmap = '     A|B|C |D |E| F|G|H\n  ━━━━━━━━━━━━━\n' +
                    '1 |' + map[0] + '|' + map[1] + '|' + map[2] + '|' + map[3] + '|' + map[4] + '|' + map[5] + '|' + map[6] + '|' + map[7] + '|\n  ━━━━━━━━━━━━━\n' +
                    '2 |' + map[8] + '|' + map[9] + '|' + map[10] + '|' + map[11] + '|' + map[12] + '|' + map[13] + '|' + map[14] + '|' + map[15] + '|\n  ━━━━━━━━━━━━━\n' +
                    '3 |' + map[16] + '|' + map[17] + '|' + map[18] + '|' + map[19] + '|' + map[20] + '|' + map[21] + '|' + map[22] + '|' + map[23] + '|\n  ━━━━━━━━━━━━━\n' +
                    '4 |' + map[24] + '|' + map[25] + '|' + map[26] + '|' + map[27] + '|' + map[28] + '|' + map[29] + '|' + map[30] + '|' + map[31] + '|\n  ━━━━━━━━━━━━━\n' +
                    '5 |' + map[32] + '|' + map[33] + '|' + map[34] + '|' + map[35] + '|' + map[36] + '|' + map[37] + '|' + map[38] + '|' + map[39] + '|\n  ━━━━━━━━━━━━━\n' +
                    '6 |' + map[40] + '|' + map[41] + '|' + map[42] + '|' + map[43] + '|' + map[44] + '|' + map[45] + '|' + map[46] + '|' + map[47] + '|\n  ━━━━━━━━━━━━━\n' +
                    '7 |' + map[48] + '|' + map[49] + '|' + map[50] + '|' + map[51] + '|' + map[52] + '|' + map[53] + '|' + map[54] + '|' + map[55] + '|\n  ━━━━━━━━━━━━━\n' +
                    '8 |' + map[56] + '|' + map[57] + '|' + map[58] + '|' + map[59] + '|' + map[60] + '|' + map[61] + '|' + map[62] + '|' + map[63] + '|\n  ━━━━━━━━━━━━━\n';


                if (board[0].status === 1) {
                    bot.sendMessage(msg.chat.id, 'Противник найден! Цвет ваших фигур: белый. Игра начнется через 15 секунд. Для того, чтобы совершить ход нужно использовать следующий формат:\n "координата откуда идет фигура" "координата куда идет фигура".\n Например: A2,A3')
                        .then(() => {
                            console.log('Message has been send');
                        });
                    connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                        function (err, tguser) {
                            if (err)
                                console.log('Error');
                            else
                                console.log("Great");
                            connection.query(" UPDATE tgusers SET status=?, gamestat=? WHERE chatid = ? ", [3.1, 1, msg.chat.id],
                                function (err) {
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Great");
                                });
                            connection.query("SELECT * FROM users " + "WHERE username= ? ", [tguser[0].login],
                                function (err, user) {
                                    if (err)
                                        console.log('Error');
                                    else
                                        console.log("Great");
                                    setTimeout(function() {
                                        connection.query(" UPDATE boards SET status=? WHERE id = ? ", [2, user[0].gameid],
                                            function (err) {
                                                if (err)
                                                    console.log(err);
                                                else
                                                    console.log("Great");
                                            });
                                    },15000);


                                });
                        });
                } else if (board[0].status === 2) {


                    bot.sendMessage(msg.chat.id, 'Ход игрока:' + board[0].playerone + '\nПоле:\n' + TGmap )
                        .then(() => {
                            console.log('Message has been send');

                            connection.query(" UPDATE tgusers SET  gamestat=? WHERE chatid = ? ", [2, msg.chat.id],
                                function (err) {
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Great");
                                });


                        })
                        .catch(() => {
                            console.error(error)
                        })
                } else if (board[0].status === 3) {
                    bot.sendMessage(msg.chat.id, 'Ход игрока:' + board[0].playertwo + '\nПоле:\n' + TGmap)
                        .then(() => {
                            console.log('Message has been send');

                            connection.query(" UPDATE tgusers SET  gamestat=? WHERE chatid = ? ", [3, msg.chat.id],
                                function (err) {
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Great");
                                });


                        })
                        .catch(() => {
                            console.error(error)
                        })

                }
                else if(board[0].status === 4){

                    bot.sendMessage(msg.chat.id, 'Победил: '+ board[0].playerone +'. Спасибо за игру. Желаете сыграть еще одну? (Да/Нет) ')
                        .then(() => {
                            console.log('Message has been send');
                        });
                    connection.query(" UPDATE tgusers SET status=?, gamestat=? WHERE chatid = ? ", [3, 4,  msg.chat.id],
                        function (err) {
                            if (err)
                                console.log(err);
                            else
                                console.log("Great");
                        });
                    connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                        function (err, tguser) {
                            if (err)
                                console.log('Error');
                            else
                                console.log("Great");


                            connection.query(" UPDATE users SET gameid=? WHERE username = ? ", [0, tguser[0].login],
                                function (err) {
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Great");
                                });
                        });
                }
                else if(board[0].status === 5){

                     bot.sendMessage(msg.chat.id, 'Победил: '+ board[0].playertwo +'. Спасибо за игру. Желаете сыграть еще одну? (Да/Нет)')
                        .then(() => {
                            console.log('Message has been send');
                        });
                    connection.query(" UPDATE tgusers SET status=?, gamestat=? WHERE chatid = ? ", [3,5, msg.chat.id],
                        function (err) {
                            if (err)
                                console.log(err);
                            else
                                console.log("Great");
                        });
                    connection.query("SELECT * FROM tgusers " + "WHERE chatid= ? ", [msg.chat.id],
                        function (err, tguser) {
                            if (err)
                                console.log('Error');
                            else
                                console.log("Great");


                            connection.query(" UPDATE users SET gameid=? WHERE username = ? ", [0, tguser[0].login],
                                function (err) {
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Great");
                                });
                        });
                }

            });
    }







});





function ChessSymbol(figure){
    switch (figure){
        case 'K': return '♔';
        case 'Q': return '♕';
        case 'R': return '♖';
        case 'B': return '♗';
        case 'N': return '♘';
        case 'P': return '♙';
        case 'k': return '♚';
        case 'q': return '♛';
        case 'r': return '♜';
        case 'b': return '♝';
        case 'n': return '♞';
        case 'p': return '♟';

        default : return '   ';

    }
}
function checkCoord(xcoord){
    switch (xcoord){
        case 'A': return 1;
        case 'a': return 1;
        case 'B': return 2;
        case 'b': return 2;
        case 'C': return 3;
        case 'c': return 3;
        case 'D': return 4;
        case 'd': return 4;
        case 'E': return 5;
        case 'e': return 5;
        case 'F': return 6;
        case 'f': return 6;
        case 'G': return 7;
        case 'g': return 7;
        case 'H': return 8;
        case 'h': return 8;

        default : return '';

    }
}
