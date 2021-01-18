$(() => {

    
    // Success Function
    const successMsg = (msg) => {
        $(".notificationSuccess")
            .html(
                `
                    <div class="cancelNotificationSuccess text-white" id="cancelNotificationSuccess">x</div>
                    <audio autoplay class="d-none">
                    <source src="
                    /assets/sounds/notification.mp3" type="audio/mpeg">
                    </audio>
                    <h4 class="text-white">Notification</h4>
                    <p class="mb-0 text-white" style="font-size: 14px">${msg}</p>
                `
            )
            .show(100)
            .delay(3000)
            .hide(100);
    }


    // Error Function
    const errorMsg = (msg) => {
        $(".notificationError")
            .html(
                `
                    <div class="cancelNotificationError text-white" id="cancelNotificationError">x</div>
                    <audio autoplay class="d-none">
                    <source src="
                    /assets/sounds/notification.mp3" type="audio/mpeg">
                    </audio>
                    <h4 class="text-white">Notification <i class="fas fa-exclamation-triangle"></i></h4>
                    <p class="mb-0 text-white" style="font-size: 14px; color: white">${msg}</p>
                `
            )
            .show(100)
            .delay(3000)
            .hide(100);
    }

    // Close both notifications (Success & Error)
    $("body").on("click", ".cancelNotificationSuccess", () => {
        $(".notificationSuccess").hide();
    });

    $("body").on("click", ".cancelNotificationError", () => {
        $(".notificationError").hide();
    });
    
    // First Method for validating the First Step
    const Location_Validation = () => {
        const locationNo = $(".locationNo").val().trim();
        if (!locationNo) return { status: false, msg: 'PostCode cannot be empty' } 
        else if(!locationNo.match(/^[/\d]{5}?$/)) return { status: false, msg: 'PostCode is composed of 5 numbers' }
        else return { status: true, msg: 'Forward to the step successfully' }
    }

     // Second Method for validating the Second Step
     const Registration_Validation = () => {
        const registrationNo = $(".registrationNo").val().trim();
        if (!registrationNo) return { status: false, msg: 'Car Number cannot be empty' } 
        else if (registrationNo.length < 4) return { status: false, msg: 'Car Number must be at least 4 chars' } 
        else if (registrationNo.length > 15) return { status: false, msg: 'Car Number must be at most 15 chars' } 
        else if(!registrationNo.match(/^[0-9a-zA-Z]+$/)) return { status: false, msg: 'Car Number should only contain letters and numbers only' }
        else return { status: true, msg: 'Forward to the step successfully' }
    }

     // Third Method for validating the Third Step
     const NRIC_Validation = () => {
        const nricNumberNo = $(".nricNumberNo").val().trim();
        if (!nricNumberNo) return { status: false, msg: 'NRIC Number cannot be empty' } 
        else if (nricNumberNo.length < 4) return { status: false, msg: 'NRIC Number must be at least 4 chars' } 
        else if (nricNumberNo.length > 15) return { status: false, msg: 'NRIC Number must be at most 15 chars' } 
        else if(!nricNumberNo.match(/^[0-9a-zA-Z]+$/)) return { status: false, msg: 'NRIC Number should only contain letters and numbers only' }
        else return { status: true, msg: 'Forward to the step successfully' }
    }

     // Fourth Method for validating the fifth Step
     const emailPhone_Validation = () => {
        const email = $(".email").val().trim();
        const phone = $(".phone").val().trim();
        const check = $(".form-check-input").is(":checked");
        if(!email || !phone || !check) return { status: false, msg: 'The fields are mandatory' }
        if(!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return { status: false, msg: 'Email Address must be correct' } 
        if(!phone.match(/^[0-9]{9,12}$/)) return { status: false, msg: 'Phone must be correct' } 
        else return { status: true, msg: 'Forward to the step successfully' }
    }

    // StepJS
    const form = $("#wizard").show();
    $(".wizard>.steps .first a span.number").html(`<i class="far fa-check-circle"></i>`);
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        titleTemplate: '<span class="number">#index#</span> #title#',
        onStepChanging:  (event, currentIndex, newIndex) => {
            if (currentIndex > newIndex) {
                 return true;
            }
            if(newIndex === 3) {
                // Here is the back-end team will make Request to the Server-Side for Vehicle Details
                const locationNo = $(".locationNo").val();
                const registrationNo = $(".registrationNo").val();
                const nricNumberNo = $(".nricNumberNo").val();
                console.log(locationNo, registrationNo, nricNumberNo);
                const config = {
                     method: 'POST',
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({ 
                         locationNo: locationNo, 
                         registrationNo: registrationNo, 
                         nricNumberNo: nricNumberNo 
                     })
                 };
                 try {
                    (async () => {
                         const fetchResponse = await fetch(`https://www.example.com/getVechDetails`, config);
                         const data = await fetchResponse.json();
                         return data;
                    })()
                 } catch (err) {
                     console.log(err.message);
                 }   
             }
           
            if(currentIndex === 0) {
                const obj = Location_Validation();
                if (obj.status === false) {
                    errorMsg(obj.msg);
                    return false;
                } else if(obj.status === true) {
                    successMsg(obj.msg);
                    return true;
                }
            }
            if(currentIndex === 1) {
                const obj = Registration_Validation();
                if (obj.status === false) {
                    errorMsg(obj.msg);
                    return false;
                } else if(obj.status === true) {
                    successMsg(obj.msg);
                    return true;
                }
            }
            if(currentIndex === 2) {
                const obj = NRIC_Validation();
                if (obj.status === false) {
                    errorMsg(obj.msg);
                    return false;
                } else if(obj.status === true) {
                    successMsg(obj.msg);
                    return true;
                }
            }
            if(currentIndex === 3) {
                successMsg('Forward to the step successfully');
                return true;
            }
            if(currentIndex === 4) {
                const obj = emailPhone_Validation();
                if (obj.status === false) {
                    errorMsg(obj.msg);
                    return false;
                } else if(obj.status === true) {
                    successMsg(obj.msg);
                    return true;
                }
             }
        },
        onStepChanged: (event, currentIndex, newIndex) => {
            const percentage = (currentIndex + 1) * (100 / 6);
            $(".progress-bar").attr("style", `width: ${percentage}%`);
            $("#percentage").text(`${percentage}%`);
        },
        onFinishing: function (event, currentIndex) {
           return true;
        },
        onFinished: function (event, currentIndex) {
           // After finishing all the steps, this function will be fired
           console.log('onFinished');
           alert('onFinished');
           setTimeout(() => {
            window.location.reload();
           }, 3000);
        }
    })
});