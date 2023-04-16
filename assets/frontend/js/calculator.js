
$('#backBtn').hide();
$('#backBtn').click(function () {
    var goals = $('input[name="goal[]"]:checked').map(function () {
        return $(this).val();
    }).get();

    var ind = $('#myCarousel').find('.active').index();
    if (goals.includes("Maintain Weight") && ind == 7) {
        $('#myCarousel').carousel(5);
    } else {
        $('#myCarousel').carousel('prev');
    }
});
$('#heightCMcon').hide();

$('.carousel').carousel({
    interval: false,
}).on('slid.bs.carousel', function () {
    curSlide = $('.active');
    var ind = parseInt($('#myCarousel').find('.active').index());
    var frst = $('#myCarousel').find('.active').attr('class').split(/\s+/);

    if (frst.includes('firstest')) {
        $('#backBtn').hide();
    } else {
        $('#backBtn').show();
    }
});
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$('.triggerInfo').click(function (e) {
    e.preventDefault();
    $('#infoModal').modal('show');

    var rf = $(this).attr('href');
    var cont = $(rf).html();
    // console.log(cont);
    $('#infoContent').html("");
    $('#infoContent').append(cont);
});

function count(string) {
    var count = 0;
    string.split('').forEach(function (s) {
        count++;
    });
    return count;
}

function nextGoal(e) {
    var ind = parseInt($('#myCarousel').find('.active').index());
    var datum = $('#calcForm').serializeObject();
    if (ind == 5 && datum['goal[]'] == undefined) {
        // alert("Kindly pick an option to proceed");
        $('#error-p-tag4').text("Kindly pick an option to proceed").show()
        return false;
    } else if (ind == 7 && (datum.workout == undefined || datum.workout == "")) {
        // alert("Kindly pick an activity to proceed");
        $('#error-p-tag5').text("Kindly pick an activity to proceed").show()
        return false;
    } else if (ind == 6) {
        if ($('#weightIN_aim').val() == "" || $('input[name="weight_time_aim"]').val() == "") {
            // alert("Kindly let us know how much you want to weigh and in how much time.");
            $('#error-p-tag6').text("Kindly let us know how much you want to weight and in how much time.").show()
            return false;
        }
        // TO DETERMINE THE WEIGHT LOSS TIME
        var ht = datum.weight;
        var htALL = ht.split(' ');
        var htTYPE = htALL[1];
        var convKG = convLBS = workoutIndex = added = calories = "";
        var KG = 0;
        if (htTYPE == 'lbs') {
            KG = Math.round(htALL[0] / 2.20462);
        } else {
            KG = parseInt(htALL[0]);
        }
        var weightToLosex = weightToLose(datum, KG);
        // TO DETERMINE THE WEIGHT LOSS TIME

        if (isNaN(weightToLosex)) {
            alert(weightToLosex);
            return false;
        } else {
            var checkWeightLosex = checkWeightLose(parseInt(datum.weight_time_aim), weightToLosex);
            if (isNaN(checkWeightLosex)) {
                $('#myModalInfo .modal-body').html(checkWeightLosex);
                $('#myModalInfo').modal('show');
                return false;
            } else {
                $('#myCarousel').carousel('next');
                $('#error-p-tag6').hide();
            }
        }
    } else {
        if (e.attr('id') == 'goalNext') {
            var goals = $('input[name="goal[]"]:checked').map(function () {
                return $(this).val();
            }).get();

            if (goals.includes("Maintain Weight"))
                $('#myCarousel').carousel(7);
        }
        $('#myCarousel').carousel('next');
        $('#error-p-tag4').hide();
        $('#error-p-tag5').hide();
    }
}

function nextSlide(e, msg) {
    var min = parseInt(e.attr('min'));
    var minC = count(min + '');
    var max = parseInt(e.attr('max'));
    var val = parseInt(e.val());
    var valC = count(val + '');

    if (e.val() == '' || e.val() == '0') {
        // console.log(e.selector);
        if (e.selector == '#age') {
            $('#error-p-tag').text(msg).show()
            e.addClass("error-input-border");
        } else if (e.selector == '#height') {
            $('#error-p-tag2').text(msg).show()
        } else {
            $('#error-p-tag3').text(msg).show()
        }
        // alert(msg);

    } else {
        // e.addClass("error-input-border");
        if ((val < min || val > max)) // && (valC >= minC))
        {
            // alert("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max);
            if (e.selector == '#age') {
                $('#error-p-tag').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
            } else if (e.selector == '#height') {
                $('#error-p-tag2').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
            } else {
                $('#error-p-tag3').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
            }
            // $('#error-p-tag').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
        } else {
            $('#myCarousel').carousel('next');
            e.removeClass("error-input-border");
            $('#error-p-tag').hide()
            $('#error-p-tag2').hide()
            $('#error-p-tag3').hide()
        }
    }
}

function clickWhomBtn(e, r) {
    $('.whom-btn').removeClass('btn-dark');
    $('.whom-btn').addClass('btn-dark-outline');
    $(e).removeClass('btn-dark-outline');
    $(e).addClass('btn-dark');

    $('input[name="whom"]').val(r);
}

function clickSexBtn(e, r) {
    $('.sex-btn').removeClass('btn-dark');
    $('.sex-btn').addClass('btn-dark-outline');
    $(e).removeClass('btn-dark-outline');
    $(e).addClass('btn-dark');

    $('input[name="sex"]').val(r);
}

function keyPressTall() {
    var ht = $('input[name="height"]').val();
    var htCM = parseInt($('#heightCM').val());
    var htFT = parseInt($('#heightFT').val());
    var htIN = parseInt($('#heightIN').val());
    var valCM = valFT = valIN = htCM ? htCM : ((htFT) ? ((htFT * 12) + htIN) * 2.54 : 0);

    $('input[name="height"]').val(Math.round(valCM));
}

function clickTallBtn(e) {
    $('.ft-cm').removeClass('activer');
    $(e).addClass('activer');
    var ht = $('input[name="height"]').val();
    var htCM = parseInt($('#heightCM').val());
    var htFT = parseInt($('#heightFT').val());
    var htIN = parseInt($('#heightIN').val());
    var valCM = valFT = valIN = htCM ? htCM : ((htFT) ? ((htFT * 12) + htIN) * 2.54 : 0);

    var whc = $(e).attr('id');
    if (whc == 'cmBtn') {
        $('#heightMsg').html("Valid height is 60cm - 300cm");
        $('#heightCM').show();
        $('#heightCMcon').show();
        $('#heightCM').val(Math.round(valCM));

        $('#heightFT').val("").hide();
        $('#heightFTcon').hide();
        $('#heightIN').val("").hide();
        $('#heightINcon').hide();
    } else {
        valIN = valCM / 2.54;
        valFT = Math.floor(valIN / 12);
        valIN = Math.round(valIN % 12);
        if (valIN == 12) {
            valIN = 0;
            valFT += 1;
        }
        $('#heightMsg').html("Valid height is 2ft - 9ft 11\"");
        $('#heightFT').show();
        $('#heightFTcon').show();
        $('#heightFT').val(valFT);
        $('#heightIN').show();
        $('#heightINcon').show();
        $('#heightIN').val(valIN);

        $('#heightCM').val("").hide();
        $('#heightCMcon').hide();
    }

    $('input[name="height"]').val(Math.round(valCM));
}

function keyPressFat() {
    var ht = $('input[name="weight"]').val();
    var htIN = $('#weightIN').val();
    var htALL = ht.split(' ');
    var htTYPE = "kg";

    if (ht != '')
        htTYPE = htALL[1];
    if (isNaN(htIN) || htIN == '' || !htIN)
        htIN = 0;

    $('input[name="weight"]').val(htIN + ' ' + htTYPE);
}

function clickFatBtn(e) {
    $('.lbs-kg').removeClass('activer');
    $(e).addClass('activer');
    var ht = $('input[name="weight"]').val();
    var htIN = $('#weightIN').val();
    var htALL = ht.split(' ');
    var htTYPE = "kg";

    if (ht != '')
        htTYPE = htALL[1];
    if (isNaN(htIN) || htIN == '' || !htIN)
        htIN = 0;

    var whc = $(e).attr('id');
    if (whc == 'kgBtn') {
        if (htTYPE != 'kg') {
            htIN = Math.round(htIN / 2.20462);
            htTYPE = 'kg';
            $('#weightIN').val(htIN);
            $('#weightIN').attr('min', '25');
            $('#weightIN').attr('max', '230');
            $('#weight').attr('min', '25');
            $('#weight').attr('max', '230');
        }
        $('#weightMsg').html("Valid weight is 25kg - 230 kg");
    } else {
        if (htTYPE == 'kg') {
            htIN = Math.round(htIN * 2.20462);
            htTYPE = 'lbs';
            $('#weightIN').val(htIN);
            $('#weightIN').attr('min', '50');
            $('#weightIN').attr('max', '500');
            $('#weight').attr('min', '50');
            $('#weight').attr('max', '500');
        }
        $('#weightMsg').html("Valid weight is 50lbs - 500lbs");
    }

    $('input[name="weight"]').val(htIN + ' ' + htTYPE);
}

function keyPressFat_aim() {
    var ht = $('input[name="weight_aim"]').val();
    var htIN = $('#weightIN_aim').val();
    var htALL = ht.split(' ');
    var htTYPE = "kg";

    if (ht != '')
        htTYPE = htALL[1];
    if (isNaN(htIN) || htIN == '' || !htIN)
        htIN = 0;

    $('input[name="weight_aim"]').val(htIN + ' ' + htTYPE);
}

function clickFatBtn_aim(e) {
    $('.lbs-kg').removeClass('activeree');
    $(e).addClass('activeree');
    var ht = $('input[name="weight_aim"]').val();
    var htIN = $('#weightIN_aim').val();
    var htALL = ht.split(' ');
    var htTYPE = "kg";

    if (ht != '')
        htTYPE = htALL[1];
    if (isNaN(htIN) || htIN == '' || !htIN)
        htIN = 0;

    var whc = $(e).attr('id');
    if (whc == 'kgBtn_aim') {
        if (htTYPE != 'kg') {
            htIN = Math.round(htIN / 2.20462);
            htTYPE = 'kg';
            $('#weightIN_aim').val(htIN);
            $('#weightIN_aim').attr('min', '23');
            $('#weightIN_aim').attr('max', '227');
            $('#weight_aim').attr('min', '23');
            $('#weight_aim').attr('max', '227');
        }
        $('#weightMsg_aim').html("Valid weight is 23kg - 227 kg");
    } else {
        if (htTYPE == 'kg') {
            htIN = Math.round(htIN * 2.20462);
            htTYPE = 'lbs';
            $('#weightIN_aim').val(htIN);
            $('#weightIN_aim').attr('min', '50');
            $('#weightIN_aim').attr('max', '500');
            $('#weight_aim').attr('min', '50');
            $('#weight_aim').attr('max', '500');
        }
        $('#weightMsg_aim').html("Valid weight is 50lbs - 500lbs");
    }

    $('input[name="weight_aim"]').val(htIN + ' ' + htTYPE);
}

function clickGoalBtn(e, r) {
    var goals = $('input[name="goal[]"]:checked').map(function () {
        return $(this).val();
    }).get();

    var input = $(e).children('input[type="checkbox"]');
    var actChk = input.is(':checked');
    var valChk = input.val();

    if (goals.includes("Maintain Weight") && valChk == "Lose Weight") {
        $("#MaintainWeight").children('input[type="checkbox"]').prop('checked', false);
        $("#MaintainWeight").removeClass('greyed-bg');

        input.prop('checked', true);
        $(e).addClass('greyed-bg');
    } else if (goals.includes("Lose Weight") && valChk == "Maintain Weight") {
        $("#LoseWeight").children('input[type="checkbox"]').prop('checked', false);
        $("#LoseWeight").removeClass('greyed-bg');

        input.prop('checked', true);
        $(e).addClass('greyed-bg');
    } else {
        if (actChk === true) {
            input.prop('checked', false);
            $(e).removeClass('greyed-bg');
        } else {
            input.prop('checked', true);
            $(e).addClass('greyed-bg');
        }
    }
}

function clickFoodBtn(e, r) {
    $('.food-cards').removeClass('greyed-bg');
    $(e).addClass('greyed-bg');

    $('input[name="food"]').val(r);
}

function clickRatioBtn(e, r) {
    $('.ratio-btn').removeClass('btn-dark');
    $('.ratio-btn').addClass('btn-dark-outline');
    $(e).removeClass('btn-dark-outline');
    $(e).addClass('btn-dark');

    $('input[name="ratios"]').val(r);
}

function clickWorkoutBtn(e, r) {
    $('.workout-cards').removeClass('greyed-bg');
    $(e).addClass('greyed-bg');

    $('input[name="workout"]').val(r);
}

function clickActivityBtn(e, r) {
    var input = $(e).children('input[type="checkbox"]');
    var actChk = input.is(':checked');

    if (actChk === true) {
        input.prop('checked', false);
        $(e).removeClass('greyed-bg');
    } else {
        input.prop('checked', true);
        $(e).addClass('greyed-bg');
    }
}

function clickFoodsBtn(e, r) {
    var input = $(e).children('input[type="checkbox"]');
    var actChk = input.is(':checked');

    if (actChk === true) {
        input.prop('checked', false);
        $(e).removeClass('greyed-bg');
    } else {
        input.prop('checked', true);
        $(e).addClass('greyed-bg');
    }
}

function proceedVal(ref = '') {
    if (ref != '') {
        var ind = parseInt($('#myCarousel').find('.active').index());
        var datum = $('#calcForm').serializeObject();
        console.log(datum);
        console.log('cal: ', datum['calories']);

        if (ind == 7 && datum['activity[]'] == undefined) {
            alert("Kindly pick a minimum of one option to proceed");
            return false;
        }
        $.ajax({
            data: datum,
            type: 'POST',
            url: "{{ url('ajax-calculator') }}",
            beforeSend: function () {
                $('#proceed-msg').html('<div class="lds-ripple"><div></div><div></div></div>');
            },
            success: function (e) {
                if (e == 'success') {
                    $('#proceed-msg').html('');
                    $('#myCarousel').carousel('next');
                } else {
                    $('#proceed-msg').html('<b>' + e + '</b><br>').css("color", "#FF9494");
                    setTimeout(function () {
                        $('#proceed-msg').html('');
                    }, 15000);
                }
            }
        });
    } else {
        $('#myCarousel').carousel('next');
    }
}

function submitForm() {
    var ind = parseInt($('#myCarousel').find('.active').index());
    var datum = $('#calcForm').serializeObject();
    if (ind == 7 && datum['activity[]'] == undefined) {
        alert("Kindly pick a minimum of one option to proceed");
        return false;
    }

    $('.min-calory').hide();
    $('#myCarousel').carousel('next');
    var datax = $('#calcForm').serialize();
    $('.weightLossResult').hide();
    $('.weightMaintainResult').hide();
    console.table(datum);

    var ht = datum.weight;
    var htALL = ht.split(' ');
    var htTYPE = htALL[1];
    var convKG = convLBS = workoutIndex = added = calories = "";
    var KG = 0;

    if (htTYPE == 'lbs') {
        convKG = Math.round(htALL[0] / 2.20462) + ' kg';
        convLBS = htALL[0] + ' lbs';
        KG = Math.round(htALL[0] / 2.20462);
    } else {
        convLBS = Math.round(htALL[0] * 2.20462) + ' lbs';
        convKG = htALL[0] + ' kg';
        KG = parseInt(htALL[0]);
    }

    added = -161;
    if (datum.sex == 'male') added = 5;
    let otherCalories = [];

    let workoutIndexes = {
        'Sedentary': 1.2,
        'Mildly Active': 1.375,
        'Moderately Active': 1.55,
        'Heavily Active': 1.7,
        'Extremely Active': 1.9
    }
    workoutIndex = workoutIndexes[datum.workout];
    console.log(workoutIndex, datum.workout, workoutIndexes);
    var weightToLosex = null;

    if (datum['goal[]'].includes('Maintain Weight')) {
        calories = maintainWeight(datum, added, workoutIndex, KG);
        if (calories > 2000) {
            calories = 2000;
        }
        // console.log("maintain: ", calories);
        for (var ind in workoutIndexes) {
            otherCalories.push(roundToNearest50(maintainWeight(datum, added, workoutIndexes[ind], KG)));
        }
        $('.weightMaintainResult').show();
        $('.invalid-result').hide();
        $('.valid-result').show();
    } else if (datum['goal[]'].includes('Lose Weight')) {
        var weightToLosex = weightToLose(datum, KG);
        if (isNaN(weightToLosex)) {
            $('.invalid-result').show();
            $('.valid-result').hide();
            $('#invalid-msg').html(weightToLosex);
            return false;
        }
        var timeToLoseWeight = parseInt(datum.weight_time_aim) * 4;
        var checkWeightLosex = checkWeightLose(parseInt(datum.weight_time_aim), weightToLosex, "yes");
        if (isNaN(checkWeightLosex)) {
            $('.recalc-next').hide();
        } else {
            $('.recalc-next').show();
        }
        calories = loseWeight(datum, added, workoutIndex, weightToLosex, timeToLoseWeight, KG);
        if (calories > 2000) {
            calories = 2000;
        }
        // console.log("Losee weight: ", calories);

        for (var ind in workoutIndexes) {
            otherCalories.push(roundToNearest50(loseWeight(datum, added, workoutIndexes[ind], weightToLosex, timeToLoseWeight, KG)));
        }
        $('.invalid-result').hide();
        $('.valid-result').show();
        $('#res-weight-text').html(weightToLosex + 'kg');
        var mons = (datum.weight_time_aim > 1) ? ' months' : ' month';
        $('#res-period-text').html(datum.weight_time_aim + mons);
        $('.weightLossResult').show();
    }

    $('#res-age').html(datum.age + ' years old');
    $('#res-weight').html(convKG + " (" + convLBS + ")");
    $('#res-height').html(datum.height + 'cm');
    $('#res-goal').html(datum['goal[]']);
    $('#res-activity').html(datum['workout']);
    $('.calories').html(roundToNearest50(calories));
    $('#caloriesField').val(roundToNearest50(calories));
    if (calories < 1200) {
        $('.min-calory').show();
        $('.calories').hide();
        $('.recalc-next').hide();
    }
    $('.calories').show();

    let caloryIndexes = {
        'Sedentary': 'SedentaryCalory',
        'Mildly Active': 'MildCalory',
        'Moderately Active': 'ModerateCalory',
        'Heavily Active': 'HeavyCalory',
        'Extremely Active': 'ExtremeCalory'
    }
    $('#SedentaryCalory h2').html(otherCalories[0]);
    $('#MildCalory h2').html(otherCalories[1]);
    $('#ModerateCalory h2').html(otherCalories[2]);
    $('#HeavyCalory h2').html(otherCalories[3]);
    $('#ExtremeCalory h2').html(otherCalories[4]);

    $('.calory-box').removeClass('active');
    $('#' + caloryIndexes[datum.workout] + ' .calory-box').addClass('active');
}

function checkWeightLose(timeToLoseWeight, KG, ignore = "") {
    var div = KG / 10;

    return (div > timeToLoseWeight) ? `Trust me I get it, you want to lose the weight as fast as possible. But it seems you are trying to lose more than 10kg per month, and that’s highly unrealistic. Kindly go back to adjust your numbers and continue with the goal.<br><br>
                <a href="javascript:void(0)" onclick="$('#myCarousel').carousel(5);$('#myModalInfo').modal('hide')" class="btn btn-dark">Adjust Your Numbers</a><a href="javascript:void(0)" onclick="$('#myCarousel').carousel('next');$('#myModalInfo').modal('hide')" class="btn btn-dark-outline" style="white-space:pre-wrap;margin:10px;">I understand, but I would like to continue with this goal</a><br><br><br><br>` : 0;
}

function weightToLose(datum, KG) {
    var htALL = datum.weight_aim.split(' ');
    var htTYPE = htALL[1];
    if (htTYPE == 'lbs')
        KGx = Math.round(htALL[0] / 2.20462);
    else
        KGx = parseInt(htALL[0]);

    return (KGx >= KG) ? `Your current weight must be greater than your target weight in other to lose some pounds. Kindly go back and adjust your numbers.` : (KG - KGx);

    // <br><br>
    //         <a href="javascript:void(0)" onclick="$('#myCarousel').carousel(5);" class="btn btn-dark" onclick="">Adjust Your Numbers</a><br><br><br><br>
}

function loseWeight(datum, added, workoutIndex, weightToLose, timeToLoseWeight, KG) {
    var maintainWeightx = maintainWeight(datum, added, workoutIndex, KG);
    var weightLoss = (weightToLose / timeToLoseWeight) * 500;

    return (maintainWeightx - weightLoss);
}

function maintainWeight(datum, added, workoutIndex, KG) {
    var res = (((10 * KG) + (6.25 * parseInt(datum.height))) - ((5 * parseInt(datum.age))));
    res = res + added;
    res = res * workoutIndex;
    return res;
}

function roundToNearest50(number) {
    return Math.round(number / 100) * 100;
}

//send email function
function sendEmailPost() {
    var datum = $('#calcForm').serializeObject();
    // console.log(datum);
    $.ajax({
        data: datum,
        type: 'POST',
        url: "{{ url('sendmail') }}",
        // beforeSend: function() {
        //     $('#proceed-msg').html('<div class="lds-ripple"><div></div><div></div></div>');
        // },
        success: function (e) {
            // $('#myCarousel').carousel('next');
            if (e == 'success') {
                // $('#proceed-msg').html('');
                // $('#myCarousel').carousel('next');
                console.log(e);
            } else {
                // $('#proceed-msg').html('<b>' + e + '</b><br>').css("color", "#FF9494");
                // setTimeout(function() {
                //     $('#proceed-msg').html(''); 
                // }, 15000);
                console.log(e);
            }
        }
    });
}


{/* <script type="text/javascript">
    $('#backBtn').hide();
    $('#backBtn').click(function() {
        var goals = $('input[name="goal[]"]:checked').map(function() {
            return $(this).val();
        }).get();

        var ind = $('#myCarousel').find('.active').index();
        if (goals.includes("Maintain Weight") && ind == 7) {
            $('#myCarousel').carousel(5);
        } else {
            $('#myCarousel').carousel('prev');
        }
    });
    $('#heightCMcon').hide();

    $('.carousel').carousel({
        interval: false,
    }).on('slid.bs.carousel', function() {
        curSlide = $('.active');
        var ind = parseInt($('#myCarousel').find('.active').index());
        var frst = $('#myCarousel').find('.active').attr('class').split(/\s+/);

        if (frst.includes('firstest')) {
            $('#backBtn').hide();
        } else {
            $('#backBtn').show();
        }
    });
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    $('.triggerInfo').click(function(e) {
        e.preventDefault();
        $('#infoModal').modal('show');

        var rf = $(this).attr('href');
        var cont = $(rf).html();
        // console.log(cont);
        $('#infoContent').html("");
        $('#infoContent').append(cont);
    });

    function count(string) {
        var count = 0;
        string.split('').forEach(function(s) {
            count++;
        });
        return count;
    }

    function nextGoal(e) {
        var ind = parseInt($('#myCarousel').find('.active').index());
        var datum = $('#calcForm').serializeObject();
        if (ind == 5 && datum['goal[]'] == undefined) {
            // alert("Kindly pick an option to proceed");
            $('#error-p-tag4').text("Kindly pick an option to proceed").show()
            return false;
        } else if (ind == 7 && (datum.workout == undefined || datum.workout == "")) {
            // alert("Kindly pick an activity to proceed");
            $('#error-p-tag5').text("Kindly pick an activity to proceed").show()
            return false;
        } else if (ind == 6) {
            if ($('#weightIN_aim').val() == "" || $('input[name="weight_time_aim"]').val() == "") {
                // alert("Kindly let us know how much you want to weigh and in how much time.");
                $('#error-p-tag6').text("Kindly let us know how much you want to weight and in how much time.").show()
                return false;
            }
            // TO DETERMINE THE WEIGHT LOSS TIME
            var ht = datum.weight;
            var htALL = ht.split(' ');
            var htTYPE = htALL[1];
            var convKG = convLBS = workoutIndex = added = calories = "";
            var KG = 0;
            if (htTYPE == 'lbs') {
                KG = Math.round(htALL[0] / 2.20462);
            } else {
                KG = parseInt(htALL[0]);
            }
            var weightToLosex = weightToLose(datum, KG);
            // TO DETERMINE THE WEIGHT LOSS TIME

            if (isNaN(weightToLosex)) {
                alert(weightToLosex);
                return false;
            } else {
                var checkWeightLosex = checkWeightLose(parseInt(datum.weight_time_aim), weightToLosex);
                if (isNaN(checkWeightLosex)) {
                    $('#myModalInfo .modal-body').html(checkWeightLosex);
                    $('#myModalInfo').modal('show');
                    return false;
                } else {
                    $('#myCarousel').carousel('next');
                    $('#error-p-tag6').hide();
                }
            }
        } else {
            if (e.attr('id') == 'goalNext') {
                var goals = $('input[name="goal[]"]:checked').map(function() {
                    return $(this).val();
                }).get();

                if (goals.includes("Maintain Weight"))
                    $('#myCarousel').carousel(7);
            }
            $('#myCarousel').carousel('next');
            $('#error-p-tag4').hide();
            $('#error-p-tag5').hide();
        }
    }

    function nextSlide(e, msg) {
        var min = parseInt(e.attr('min'));
        var minC = count(min + '');
        var max = parseInt(e.attr('max'));
        var val = parseInt(e.val());
        var valC = count(val + '');

        if (e.val() == '' || e.val() == '0') {
            // console.log(e.selector);
            if (e.selector == '#age') {
                $('#error-p-tag').text(msg).show()
                e.addClass("error-input-border");
            } else if (e.selector == '#height') {
                $('#error-p-tag2').text(msg).show()
            } else {
                $('#error-p-tag3').text(msg).show()
            }
            // alert(msg);

        } else {
            // e.addClass("error-input-border");
            if ((val < min || val > max)) // && (valC >= minC))
            {
                // alert("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max);
                if (e.selector == '#age') {
                    $('#error-p-tag').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
                } else if (e.selector == '#height') {
                    $('#error-p-tag2').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
                } else {
                    $('#error-p-tag3').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
                }
                // $('#error-p-tag').text("Your input value must not be:\n\n-  Lesser than " + min + "\n-  Greater than " + max).show();
            } else {
                $('#myCarousel').carousel('next');
                e.removeClass("error-input-border");
                $('#error-p-tag').hide()
                $('#error-p-tag2').hide()
                $('#error-p-tag3').hide()
            }
        }
    }

    function clickWhomBtn(e, r) {
        $('.whom-btn').removeClass('btn-dark');
        $('.whom-btn').addClass('btn-dark-outline');
        $(e).removeClass('btn-dark-outline');
        $(e).addClass('btn-dark');

        $('input[name="whom"]').val(r);
    }

    function clickSexBtn(e, r) {
        $('.sex-btn').removeClass('btn-dark');
        $('.sex-btn').addClass('btn-dark-outline');
        $(e).removeClass('btn-dark-outline');
        $(e).addClass('btn-dark');

        $('input[name="sex"]').val(r);
    }

    function keyPressTall() {
        var ht = $('input[name="height"]').val();
        var htCM = parseInt($('#heightCM').val());
        var htFT = parseInt($('#heightFT').val());
        var htIN = parseInt($('#heightIN').val());
        var valCM = valFT = valIN = htCM ? htCM : ((htFT) ? ((htFT * 12) + htIN) * 2.54 : 0);

        $('input[name="height"]').val(Math.round(valCM));
    }

    function clickTallBtn(e) {
        $('.ft-cm').removeClass('activer');
        $(e).addClass('activer');
        var ht = $('input[name="height"]').val();
        var htCM = parseInt($('#heightCM').val());
        var htFT = parseInt($('#heightFT').val());
        var htIN = parseInt($('#heightIN').val());
        var valCM = valFT = valIN = htCM ? htCM : ((htFT) ? ((htFT * 12) + htIN) * 2.54 : 0);

        var whc = $(e).attr('id');
        if (whc == 'cmBtn') {
            $('#heightMsg').html("Valid height is 60cm - 300cm");
            $('#heightCM').show();
            $('#heightCMcon').show();
            $('#heightCM').val(Math.round(valCM));

            $('#heightFT').val("").hide();
            $('#heightFTcon').hide();
            $('#heightIN').val("").hide();
            $('#heightINcon').hide();
        } else {
            valIN = valCM / 2.54;
            valFT = Math.floor(valIN / 12);
            valIN = Math.round(valIN % 12);
            if (valIN == 12) {
                valIN = 0;
                valFT += 1;
            }
            $('#heightMsg').html("Valid height is 2ft - 9ft 11\"");
            $('#heightFT').show();
            $('#heightFTcon').show();
            $('#heightFT').val(valFT);
            $('#heightIN').show();
            $('#heightINcon').show();
            $('#heightIN').val(valIN);

            $('#heightCM').val("").hide();
            $('#heightCMcon').hide();
        }

        $('input[name="height"]').val(Math.round(valCM));
    }

    function keyPressFat() {
        var ht = $('input[name="weight"]').val();
        var htIN = $('#weightIN').val();
        var htALL = ht.split(' ');
        var htTYPE = "kg";

        if (ht != '')
            htTYPE = htALL[1];
        if (isNaN(htIN) || htIN == '' || !htIN)
            htIN = 0;

        $('input[name="weight"]').val(htIN + ' ' + htTYPE);
    }

    function clickFatBtn(e) {
        $('.lbs-kg').removeClass('activer');
        $(e).addClass('activer');
        var ht = $('input[name="weight"]').val();
        var htIN = $('#weightIN').val();
        var htALL = ht.split(' ');
        var htTYPE = "kg";

        if (ht != '')
            htTYPE = htALL[1];
        if (isNaN(htIN) || htIN == '' || !htIN)
            htIN = 0;

        var whc = $(e).attr('id');
        if (whc == 'kgBtn') {
            if (htTYPE != 'kg') {
                htIN = Math.round(htIN / 2.20462);
                htTYPE = 'kg';
                $('#weightIN').val(htIN);
                $('#weightIN').attr('min', '25');
                $('#weightIN').attr('max', '230');
                $('#weight').attr('min', '25');
                $('#weight').attr('max', '230');
            }
            $('#weightMsg').html("Valid weight is 25kg - 230 kg");
        } else {
            if (htTYPE == 'kg') {
                htIN = Math.round(htIN * 2.20462);
                htTYPE = 'lbs';
                $('#weightIN').val(htIN);
                $('#weightIN').attr('min', '50');
                $('#weightIN').attr('max', '500');
                $('#weight').attr('min', '50');
                $('#weight').attr('max', '500');
            }
            $('#weightMsg').html("Valid weight is 50lbs - 500lbs");
        }

        $('input[name="weight"]').val(htIN + ' ' + htTYPE);
    }

    function keyPressFat_aim() {
        var ht = $('input[name="weight_aim"]').val();
        var htIN = $('#weightIN_aim').val();
        var htALL = ht.split(' ');
        var htTYPE = "kg";

        if (ht != '')
            htTYPE = htALL[1];
        if (isNaN(htIN) || htIN == '' || !htIN)
            htIN = 0;

        $('input[name="weight_aim"]').val(htIN + ' ' + htTYPE);
    }

    function clickFatBtn_aim(e) {
        $('.lbs-kg').removeClass('activeree');
        $(e).addClass('activeree');
        var ht = $('input[name="weight_aim"]').val();
        var htIN = $('#weightIN_aim').val();
        var htALL = ht.split(' ');
        var htTYPE = "kg";

        if (ht != '')
            htTYPE = htALL[1];
        if (isNaN(htIN) || htIN == '' || !htIN)
            htIN = 0;

        var whc = $(e).attr('id');
        if (whc == 'kgBtn_aim') {
            if (htTYPE != 'kg') {
                htIN = Math.round(htIN / 2.20462);
                htTYPE = 'kg';
                $('#weightIN_aim').val(htIN);
                $('#weightIN_aim').attr('min', '23');
                $('#weightIN_aim').attr('max', '227');
                $('#weight_aim').attr('min', '23');
                $('#weight_aim').attr('max', '227');
            }
            $('#weightMsg_aim').html("Valid weight is 23kg - 227 kg");
        } else {
            if (htTYPE == 'kg') {
                htIN = Math.round(htIN * 2.20462);
                htTYPE = 'lbs';
                $('#weightIN_aim').val(htIN);
                $('#weightIN_aim').attr('min', '50');
                $('#weightIN_aim').attr('max', '500');
                $('#weight_aim').attr('min', '50');
                $('#weight_aim').attr('max', '500');
            }
            $('#weightMsg_aim').html("Valid weight is 50lbs - 500lbs");
        }

        $('input[name="weight_aim"]').val(htIN + ' ' + htTYPE);
    }

    function clickGoalBtn(e, r) {
        var goals = $('input[name="goal[]"]:checked').map(function() {
            return $(this).val();
        }).get();

        var input = $(e).children('input[type="checkbox"]');
        var actChk = input.is(':checked');
        var valChk = input.val();

        if (goals.includes("Maintain Weight") && valChk == "Lose Weight") {
            $("#MaintainWeight").children('input[type="checkbox"]').prop('checked', false);
            $("#MaintainWeight").removeClass('greyed-bg');

            input.prop('checked', true);
            $(e).addClass('greyed-bg');
        } else if (goals.includes("Lose Weight") && valChk == "Maintain Weight") {
            $("#LoseWeight").children('input[type="checkbox"]').prop('checked', false);
            $("#LoseWeight").removeClass('greyed-bg');

            input.prop('checked', true);
            $(e).addClass('greyed-bg');
        } else {
            if (actChk === true) {
                input.prop('checked', false);
                $(e).removeClass('greyed-bg');
            } else {
                input.prop('checked', true);
                $(e).addClass('greyed-bg');
            }
        }
    }

    function clickFoodBtn(e, r) {
        $('.food-cards').removeClass('greyed-bg');
        $(e).addClass('greyed-bg');

        $('input[name="food"]').val(r);
    }

    function clickRatioBtn(e, r) {
        $('.ratio-btn').removeClass('btn-dark');
        $('.ratio-btn').addClass('btn-dark-outline');
        $(e).removeClass('btn-dark-outline');
        $(e).addClass('btn-dark');

        $('input[name="ratios"]').val(r);
    }

    function clickWorkoutBtn(e, r) {
        $('.workout-cards').removeClass('greyed-bg');
        $(e).addClass('greyed-bg');

        $('input[name="workout"]').val(r);
    }

    function clickActivityBtn(e, r) {
        var input = $(e).children('input[type="checkbox"]');
        var actChk = input.is(':checked');

        if (actChk === true) {
            input.prop('checked', false);
            $(e).removeClass('greyed-bg');
        } else {
            input.prop('checked', true);
            $(e).addClass('greyed-bg');
        }
    }

    function clickFoodsBtn(e, r) {
        var input = $(e).children('input[type="checkbox"]');
        var actChk = input.is(':checked');

        if (actChk === true) {
            input.prop('checked', false);
            $(e).removeClass('greyed-bg');
        } else {
            input.prop('checked', true);
            $(e).addClass('greyed-bg');
        }
    }

    function proceedVal(ref = '') {
        if (ref != '') {
            var ind = parseInt($('#myCarousel').find('.active').index());
            var datum = $('#calcForm').serializeObject();
            console.log(datum);
            console.log('cal: ', datum['calories']);

            if (ind == 7 && datum['activity[]'] == undefined) {
                alert("Kindly pick a minimum of one option to proceed");
                return false;
            }
            $.ajax({
                data: datum,
                type: 'POST',
                url: "{{ url('ajax-calculator') }}",
                beforeSend: function() {
                    $('#proceed-msg').html('<div class="lds-ripple"><div></div><div></div></div>');
                },
                success: function(e) {
                    if (e == 'success') {
                        $('#proceed-msg').html('');
                        $('#myCarousel').carousel('next');
                    } else {
                        $('#proceed-msg').html('<b>' + e + '</b><br>').css("color", "#FF9494");
                        setTimeout(function() {
                            $('#proceed-msg').html('');
                        }, 15000);
                    }
                }
            });
        } else {
            $('#myCarousel').carousel('next');
        }
    }

    function submitForm() {
        var ind = parseInt($('#myCarousel').find('.active').index());
        var datum = $('#calcForm').serializeObject();
        if (ind == 7 && datum['activity[]'] == undefined) {
            alert("Kindly pick a minimum of one option to proceed");
            return false;
        }

        $('.min-calory').hide();
        $('#myCarousel').carousel('next');
        var datax = $('#calcForm').serialize();
        $('.weightLossResult').hide();
        $('.weightMaintainResult').hide();
        console.table(datum);

        var ht = datum.weight;
        var htALL = ht.split(' ');
        var htTYPE = htALL[1];
        var convKG = convLBS = workoutIndex = added = calories = "";
        var KG = 0;

        if (htTYPE == 'lbs') {
            convKG = Math.round(htALL[0] / 2.20462) + ' kg';
            convLBS = htALL[0] + ' lbs';
            KG = Math.round(htALL[0] / 2.20462);
        } else {
            convLBS = Math.round(htALL[0] * 2.20462) + ' lbs';
            convKG = htALL[0] + ' kg';
            KG = parseInt(htALL[0]);
        }

        added = -161;
        if (datum.sex == 'male') added = 5;
        let otherCalories = [];

        let workoutIndexes = {
            'Sedentary': 1.2,
            'Mildly Active': 1.375,
            'Moderately Active': 1.55,
            'Heavily Active': 1.7,
            'Extremely Active': 1.9
        }
        workoutIndex = workoutIndexes[datum.workout];
        console.log(workoutIndex, datum.workout, workoutIndexes);
        var weightToLosex = null;

        if (datum['goal[]'].includes('Maintain Weight')) {
            calories = maintainWeight(datum, added, workoutIndex, KG);
            if (calories > 2000) {
                calories = 2000;
            }
            // console.log("maintain: ", calories);
            for (var ind in workoutIndexes) {
                otherCalories.push(roundToNearest50(maintainWeight(datum, added, workoutIndexes[ind], KG)));
            }
            $('.weightMaintainResult').show();
            $('.invalid-result').hide();
            $('.valid-result').show();
        } else if (datum['goal[]'].includes('Lose Weight')) {
            var weightToLosex = weightToLose(datum, KG);
            if (isNaN(weightToLosex)) {
                $('.invalid-result').show();
                $('.valid-result').hide();
                $('#invalid-msg').html(weightToLosex);
                return false;
            }
            var timeToLoseWeight = parseInt(datum.weight_time_aim) * 4;
            var checkWeightLosex = checkWeightLose(parseInt(datum.weight_time_aim), weightToLosex, "yes");
            if (isNaN(checkWeightLosex)) {
                $('.recalc-next').hide();
            } else {
                $('.recalc-next').show();
            }
            calories = loseWeight(datum, added, workoutIndex, weightToLosex, timeToLoseWeight, KG);
            if (calories > 2000) {
                calories = 2000;
            }
            // console.log("Losee weight: ", calories);

            for (var ind in workoutIndexes) {
                otherCalories.push(roundToNearest50(loseWeight(datum, added, workoutIndexes[ind], weightToLosex, timeToLoseWeight, KG)));
            }
            $('.invalid-result').hide();
            $('.valid-result').show();
            $('#res-weight-text').html(weightToLosex + 'kg');
            var mons = (datum.weight_time_aim > 1) ? ' months' : ' month';
            $('#res-period-text').html(datum.weight_time_aim + mons);
            $('.weightLossResult').show();
        }

        $('#res-age').html(datum.age + ' years old');
        $('#res-weight').html(convKG + " (" + convLBS + ")");
        $('#res-height').html(datum.height + 'cm');
        $('#res-goal').html(datum['goal[]']);
        $('#res-activity').html(datum['workout']);
        $('.calories').html(roundToNearest50(calories));
        $('#caloriesField').val(roundToNearest50(calories));
        if (calories < 1200) {
            $('.min-calory').show();
            $('.calories').hide();
            $('.recalc-next').hide();
        }
        $('.calories').show();

        let caloryIndexes = {
            'Sedentary': 'SedentaryCalory',
            'Mildly Active': 'MildCalory',
            'Moderately Active': 'ModerateCalory',
            'Heavily Active': 'HeavyCalory',
            'Extremely Active': 'ExtremeCalory'
        }
        $('#SedentaryCalory h2').html(otherCalories[0]);
        $('#MildCalory h2').html(otherCalories[1]);
        $('#ModerateCalory h2').html(otherCalories[2]);
        $('#HeavyCalory h2').html(otherCalories[3]);
        $('#ExtremeCalory h2').html(otherCalories[4]);

        $('.calory-box').removeClass('active');
        $('#' + caloryIndexes[datum.workout] + ' .calory-box').addClass('active');
    }

    function checkWeightLose(timeToLoseWeight, KG, ignore = "") {
        var div = KG / 10;

        return (div > timeToLoseWeight) ? `Trust me I get it, you want to lose the weight as fast as possible. But it seems you are trying to lose more than 10kg per month, and that’s highly unrealistic. Kindly go back to adjust your numbers and continue with the goal.<br><br>
                <a href="javascript:void(0)" onclick="$('#myCarousel').carousel(5);$('#myModalInfo').modal('hide')" class="btn btn-dark">Adjust Your Numbers</a><a href="javascript:void(0)" onclick="$('#myCarousel').carousel('next');$('#myModalInfo').modal('hide')" class="btn btn-dark-outline" style="white-space:pre-wrap;margin:10px;">I understand, but I would like to continue with this goal</a><br><br><br><br>` : 0;
    }

    function weightToLose(datum, KG) {
        var htALL = datum.weight_aim.split(' ');
        var htTYPE = htALL[1];
        if (htTYPE == 'lbs')
            KGx = Math.round(htALL[0] / 2.20462);
        else
            KGx = parseInt(htALL[0]);

        return (KGx >= KG) ? `Your current weight must be greater than your target weight in other to lose some pounds. Kindly go back and adjust your numbers.` : (KG - KGx);

        // <br><br>
        //         <a href="javascript:void(0)" onclick="$('#myCarousel').carousel(5);" class="btn btn-dark" onclick="">Adjust Your Numbers</a><br><br><br><br>
    }

    function loseWeight(datum, added, workoutIndex, weightToLose, timeToLoseWeight, KG) {
        var maintainWeightx = maintainWeight(datum, added, workoutIndex, KG);
        var weightLoss = (weightToLose / timeToLoseWeight) * 500;

        return (maintainWeightx - weightLoss);
    }

    function maintainWeight(datum, added, workoutIndex, KG) {
        var res = (((10 * KG) + (6.25 * parseInt(datum.height))) - ((5 * parseInt(datum.age))));
        res = res + added;
        res = res * workoutIndex;
        return res;
    }

    function roundToNearest50(number) {
        return Math.round(number / 100) * 100;
    }

    //send email function
    function sendEmailPost() {
        var datum = $('#calcForm').serializeObject();
        // console.log(datum);
        $.ajax({
            data: datum,
            type: 'POST',
            url: "{{ url('sendmail') }}",
            // beforeSend: function() {
            //     $('#proceed-msg').html('<div class="lds-ripple"><div></div><div></div></div>');
            // },
            success: function(e) {
                // $('#myCarousel').carousel('next');
                if (e == 'success') {
                    // $('#proceed-msg').html('');
                    // $('#myCarousel').carousel('next');
                    console.log(e);
                } else {
                    // $('#proceed-msg').html('<b>' + e + '</b><br>').css("color", "#FF9494");
                    // setTimeout(function() {
                    //     $('#proceed-msg').html(''); 
                    // }, 15000);
                    console.log(e);
                }
            }
        });
    }
</script> */}