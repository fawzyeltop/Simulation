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


    // first method for validating the first step
    const Location_Validation = () => {
        const locationNo = $(".locationNo").val();
        if (!locationNo.trim()) return { status: false, msg: 'PostCode cannot be empty' }
        else return false;
    }

    // StepJS
    const form = $("#wizard").show();
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            if(currentIndex === 0) {
                const obj = Location_Validation();
                if (obj.status === false) {
                    errorMsg(obj.msg);
                    return false;
                }
            }
           
            return true;
        },
        onStepChanged: (event, currentIndex, newIndex) => {
            const percentage = (currentIndex + 1) * (100 / 6).toFixed()
            $(".progress-bar").attr("style", `width: ${percentage}%`);
            $("#percentage").text(`${percentage}%`);
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            alert("Submitted!");
        }
    })
});