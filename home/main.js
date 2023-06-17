
let date = new Date(); // tạo đối tượng ngày mới với ngày và giờ hiện tại
let year = date.getFullYear(); // lấy năm hiện tại
let month = date.getMonth(); //lấy tháng hiện tại

const day = document.querySelector(".schedule__dates");
const currentDate = document.querySelector(".schedule__current-date");
const prenexIcons = document.querySelectorAll(".schedule__navigation i");

const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

//chức năng tạo lịch

const manipulate = ()=> {
    /**
     * getDate() lấy ngày (1 - 31)
        getDay() lấy ngày trong tuần (0-6)
     */
    //lấy ngày đầu của tháng
    let dayOne = new Date(year,month,1).getDay();

    // get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();
    // get the day of the last date of the month
    let dayend=new Date(year, month, lastdate).getDay();
    // get the last date of the previous month
    let monthlastdate=new Date(year, month, 0).getDate();

    let lit = ""; // variable to store the generated calendar HTML

    for (let i= dayOne; i > 0; i--) {
        lit+=`<li class="inactive"><span class="schdule-date-text">${monthlastdate - i + 1}</span></li>`;
    }
     // loop to add the dates of the current month
     for (let i=1; i <=lastdate; i++) {
        // check if the current date is today
        let isToday=i===date.getDate() && month===new Date().getMonth() && year===new Date().getFullYear() ? "active": "";
        lit+=`<li class="${isToday}"><span class="schdule-date-text">${i}</span></li>`
    }
    // loop to add the first dates of the next month
    for (let i=dayend; i < 6; i++) {
        lit+=`<li class="inactive"><span class="schdule-date-text">${i - dayend + 1}</span></li>`
    }
        
    // update the text of the current date element with the formatted current month and year
    currentDate.innerText=`${months[month]} ${year}`;
        
    // update the HTML of the dates element with the generated calendar
    day.innerHTML=lit;
}

manipulate();

 // Attach a click event listener to each icon
 prenexIcons.forEach(function(icon) {
    // When an icon is clicked
    icon.addEventListener("click", ()=> {
        // Check if the icon is "calendar-prev" or "calendar-next"
        month=icon.id==="calendar-prev" ? month - 1 : month + 1;
        // Check if the month is out of range
        if (month < 0 || month > 11) {
            // Set the date to the first day of the month with the new year
            date=new Date(year, month, new Date().getDate());
            // Set the year to the new year
            year=date.getFullYear();
            // Set the month to the new month
            month=date.getMonth();
        }
        else {
            // Set the date to the current date
            date=new Date();
        }
        // Call the manipulate function to update the calendar display
        manipulate();
    });
});

var oPenFormCreate = document.querySelector('.create__task');
var closeFormCreate = document.querySelector('.close-form__create');
var btnAddedFormCreate = document.querySelector('.js-homeP-form__create-btn');
var formCreate = document.querySelector('.homeP-form__create');
var contentForm = document.querySelector('.homeP-form__create-content');
function showFormCreate() {
    formCreate.classList.remove('close')
}

function hideFormCreate() {
    formCreate.classList.add('close')
}

oPenFormCreate.addEventListener('click', showFormCreate);
// // thong bao 

   function toast({ title = '', message = '', type = 'info', duration = 3000 }) {
    const main = document.getElementById('toast');
    if(main) {
        const toast = document.createElement('div');
        // auto remove toast
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast);
        }, duration + 1000);

        //remove toast when clicked
        toast.onclick = function(e) {
            if(e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        }

        const icons = {
            success: 'fas fa-circle-check',
            info: 'fas fa-circle-info',
            warning: 'fas fa-circle-exclamation',
            error: 'fas fa-circle-exclamation',
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>

            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>

            <div class="toast__close">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
        `;
        main.appendChild(toast);

    }
}

function showSuccessToast() {
    toast({
        title: 'Thành công!',
        message: 'Đã thực hiện thành công',
        type: 'success',
        duration: 2000
    });
}

function showErrorToast() {
    toast({
        title: 'Cảnh báo!',
        message: 'Bạn chưa tạo công việc',
        type: 'warning',
        duration: 2000
    });
}

btnAddedFormCreate.onclick = function() {
    hideFormCreate();
    showSuccessToast();
}

closeFormCreate.addEventListener('click', function() {
    hideFormCreate();
    showErrorToast();
});

formCreate.addEventListener('click', function() {
    hideFormCreate();
    showErrorToast();
});

contentForm.addEventListener('click', function(e) {
    e.stopPropagation();
})

var remindBtn = document.querySelector('.homeP-form__create-remind-icon');
var remindList = document.querySelector('.remind-list');
var countClick = 0;
remindBtn.onclick = function() {   
    remindList.style.display = 'block';
}
var remindInput = document.querySelector('.homeP-form__create-remind');
var remindItems = document.querySelectorAll('.remind-item');

var tick;
for(var  i = 0; i < remindItems.length; i++) {
    remindItems[i].onclick = function(e) {
        remindList.style.display = 'none';
        remindInput.setAttribute('placeholder',`${e.target.innerHTML}`)
    }
}

var listDay = day.childNodes;

var task = [
    {
        time: '8:00 - 10:30',
        text:  'Học UIUX'
    },
    {
        time: '7:30 - 9:30',
        text:  'Đá bóng'
    },
    {
        time: '10:00 - 11:45',
        text:  'Học Tiếng Nhật'
    },
    {
        time: '13:00 - 15:30',
        text:  'Báo cáo GR1'
    },
];

// việc 1
var elementDate = listDay[11];
var html = elementDate.innerHTML;
    html += `
    <div class="homeP-task__abbreviate" style="background-color:#f0925b;">
        <div class="homeP-task__abbreviate-content">
            <span class="homeP-task__abbreviate-time">10:15 - 11:45</span>
            <span class="homeP-task__abbreviate-text">Học tiếng nhật</span>
        </div>
    </div>
    `;


elementDate.innerHTML = html;
// việc 2
var elementDateTwo = listDay[20];
var html3 = elementDateTwo.innerHTML;
function addTask3( {time='', text=''}) {
    html3 += `
    <div class="homeP-task__abbreviate" style="background-color: var(--primary-color);">
        <div class="homeP-task__abbreviate-content" >
            <span class="homeP-task__abbreviate-time">${time}</span>
            <span class="homeP-task__abbreviate-text">${text}</span>
        </div>
    </div>
    `;
}
function showTaskOnCalendar() {
    addTask3({
        time: '8:30 - 9:30' ,
        text: 'Đá bóng'
    });
}
showTaskOnCalendar();
elementDateTwo.innerHTML = html3;

// việc 3

var elementDateThree = listDay[8];
var html = elementDateThree.innerHTML;

function addTask2( {time='', text='' ,time2='', text2=''}) {
    html += `
    <div class="homeP-task__abbreviate">
        <div class="homeP-task__abbreviate-content" onclick=showDetail() style="background-color: #ec6f6f;">
            <span class="homeP-task__abbreviate-time">${time}</span>
            <span class="homeP-task__abbreviate-text">${text}</span>
        </div>
    </div>
    <div class="homeP-task__abbreviate" style="margin-top: 21px;">
        <div class="homeP-task__abbreviate-content">
            <span class="homeP-task__abbreviate-time">${time2}</span>
            <span class="homeP-task__abbreviate-text">${text2}</span>
        </div>
    </div>
    <div class="homeP__moretask"><a href="">+2 more...</a></div>
    `;
}

function showTaskOnCalendar2() {
    addTask2({
        time: '13:00 - 15:30' ,
        text: 'Học UIUX',
        time2: '8:00 - 10:30' ,
        text2: 'Báo cáo GR1'
    });
}
showTaskOnCalendar2();
elementDateThree.innerHTML = html;

var taskContainer =document.querySelector('.homeP-task__container')
var closeTaskContaner = document.querySelector('.homeP-task__icon-close');
var watchDetail = document.querySelector('.js-watch-detail');
var deleteTask = document.querySelector('.js-task-remove');
var btnDelete = document.querySelector('.js-homeP-delete-button');
var modalDelete = document.querySelector('.js-homeP-delete');
var btnEdit = document.querySelector('.js-detail-edit');
var btnExit = document.querySelector('.js-detail-exit');
var modalEdit = document.querySelector('.js-homeP__wacht-detail');
var cancelDelete = document.querySelector('.js-homeP-cancel-button');
function showDetail() {
    taskContainer.style.display='block';
    taskContainer.style.animation=`headerNotifyGrowwth ease-in 0.3s`;
}

function hideDetail() {
    taskContainer.style.display='none';
}

function xoaTask() {
    modalDelete.style.display='block';
}

function xemDetail() {
    modalEdit.style.display = 'flex';
}

closeTaskContaner.addEventListener('click',hideDetail);
watchDetail.addEventListener('click', xemDetail);
deleteTask.addEventListener('click',xoaTask);

function showSuccessDelete() {
    toast({
        title: 'Thành công!',
        message: 'Đã xóa thành công',
        type: 'success',
        duration: 2000
    });
}

function showSuccessEdit() {
    toast({
        title: 'Thành công!',
        message: 'Đã chỉnh sửa thành công',
        type: 'success',
        duration: 2000
    });
}

cancelDelete.onclick = function() {
    modalDelete.style.display='none';
}

btnDelete.onclick = function(){
    modalDelete.style.display='none';
    showSuccessDelete();
}

btnEdit.onclick = function() {
    modalEdit.style.display='none';
    showSuccessEdit();
}

btnExit.onclick = function() {
    modalEdit.style.display='none';
}


var infoUserForm = document.querySelector('.js-homeP__info-user');
var btnFormInfosave = document.querySelector('.js-info-user__save');
var btnFormInfocancel = document.querySelector('.js-info-user__cancel');
var thongTinTaiKhoan = document.querySelector('.js-homeP__navbar-user-item');


thongTinTaiKhoan.onclick = function() {
    infoUserForm.style.display = 'flex';
}

btnFormInfosave.addEventListener('click', function() {
    infoUserForm.style.display = 'none';
    showSuccessEdit();
})

btnFormInfocancel.addEventListener('click', function() {
    infoUserForm.style.display = 'none';
})


var listSidebars = document.querySelectorAll('.HomeP__category-item');
var listScreen = document.querySelectorAll('.sidebar');
function removeActive(e) {
    e.classList.remove('color--active')
}
function showActive(e) {
    e.classList.add('color--active')
}

var lengthSidebar = listSidebars.length;
var lengthScreen = listScreen.length;
function checkActive() {
    var rs = 0;
    for(var i = 0; i< lengthSidebar; i++) {
        if(listSidebars[i].classList.contains('color--active')){
           rs = i;
        }
    }
    return rs;
}
for (const key in listSidebars) {
    listSidebars[key].onclick = function() {
        for(var i = 0; i< lengthSidebar; i++){
            if(i == checkActive()){
                listSidebars[i].classList.remove('color--active');
                listSidebars[key].classList.add('color--active');
            }
        }
    }
}

var detailCanvas = document.getElementById('detail-canvas');
var percent =  document.querySelector('.js-detail-canvas-percent');
var p = percent.innerHTML.slice(-percent.innerHTML.length,-1);
var stringPercent = + p;


var addPercentBtn = document.querySelector('.js-percentAdd');
var minusPercentBtn = document.querySelector('.js-percentMinus');

// addPercentBtn.addEventListener('click', function() {
//     stringPercent += 10;
//     percent.innerHTML = `${stringPercent}%`;
    
// })
//  minusPercentBtn.addEventListener('click', function() {
//     stringPercent -= 10;
//     percent.innerHTML = `${stringPercent}%`;
    
// })

function addPercent() {
    stringPercent += 10;
    percent.innerHTML = `${stringPercent}%`; 
}
function minusPercent() {
    stringPercent -= 10;
    percent.innerHTML = `${stringPercent}%`;
}
addPercentBtn.onclick = addPercent;
minusPercentBtn.onclick = minusPercent;

setTimeout(function(){
    var dt = {
        labels: [
            
          ],
          datasets: [{
            label: 'Task',
            data: [stringPercent ,100-stringPercent],
            backgroundColor: [
            "rgb(255, 119, 119, 1)",
              "rgb(105, 75, 219,1)"
            ],
            hoverOffset: 4
        }]
    };
    const fg = {
        type: 'doughnut',
        data: dt,
        options: {
            responsive: true,
           legend: {
             display: false
           }
        },
        
    };
    var detailChart = new Chart(detailCanvas, fg);
    
},5000)



