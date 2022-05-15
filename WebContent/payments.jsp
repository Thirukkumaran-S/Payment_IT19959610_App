<%@ page import="com.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
	<html>
		<head>
		<meta charset="ISO-8859-1">
		<title>Payment</title>
		<link rel="stylesheet" href="Views/bootstrap.min.css">
		<script src="Components/jquery.min.js"></script>
		<script src="Components/payments.js"></script>
		
		</head>
	<body>
<nav class="navbar navbar-light" style="background-color: #e3f2fd;">
<div style="text-align: center">
  <h1>Payment Management</h1>
 </div>
</nav>

      
	<br>
	<div class="container" style="max-width: 90%">
	<div style="text-align: center">
		<h2>Payment Details</h2><br></br>
	</div>
 
		<div>
			<form id="Paymentform" name="Paymentform">
				 Customer Name: 
				 <input id="customerName" name="customerName" type="text" 
				 class="form-control">
				 <br> Account Number: 
				 <input id="accountNumber" name="accountNumber" type="text" 
				 class="form-control">
				 <br> Amount: 
				 <input id="amount" name="amount" type="text" 
				 class="form-control">
				 <br> Card Number: 
				 <input id="cardNumber" name="cardNumber" type="text" 
				 class="form-control">
				 <br>Date: 
				 <input id="date" name="date" type="text" 
				 class="form-control">
				 <br>CVV: 
				 <input id="cvv" name="cvv" type="text" 
				 class="form-control">
				 <br>
				 <input id="btnSave" name="btnSave" type="button" value="Save" 
				 class="btn btn-info btn-lg">
				 <input type="hidden" id="Paymentid" 
				 name="Paymentid" value="">
				 
			</form>
			<br>
		<div id="alertSuccess" class="alert alert-success"></div>
		<div id="alertError" class="alert alert-danger"></div>
		
		<br>
		</div>
		<div id="PaymentGrid" style="text-align: center">
		<br>
			 <%
			 Payment paymentObj = new Payment(); 
			 out.print(paymentObj.readPayments()); 
			 %>
		</div>
	
		
	</body>
	</html>