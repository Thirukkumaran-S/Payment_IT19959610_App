$(document).ready(function() 
	{ 
		if ($("#alertSuccess").text().trim() == "") 
		 { 
		 $("#alertSuccess").hide(); 
		 } 
		 $("#alertError").hide(); 
	});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
	{ 
		 // Clear alerts---------------------
		 $("#alertSuccess").text(""); 
		 $("#alertSuccess").hide(); 
		 $("#alertError").text(""); 
		 $("#alertError").hide(); 
		 
		 // Form validation-------------------
		 var status = validatePaymentForm(); 
		 if (status != true) 
			 { 
				 $("#alertError").text(status); 
				 $("#alertError").show(); 
				 return; 
			 } 
		 
		 // If valid------------------------
		 var type = ($("#Paymentid").val() == "") ? "POST" : "PUT"; 
		 
		 $.ajax( 
			 { 
				 url : "Payments", 
				 type : type, 
				 data : $("#PaymentForm").serialize(), 
				 dataType : "text", 
				 complete : function(response, status) 
				 { 
					 SavePayment(response.responseText, status); 
				 } 
			 }
		 ); 
	});

function SavePayment(response, status) 
	{ 
		if (status == "success")
			{
				var resultSet = JSON.parse(response); 
				if (resultSet.status.trim() == "success") 
					{ 
						$("#alertSuccess").text("Saved Successfully."); 
						$("#alertSuccess").show(); 
						$("#PaymentGrid").html(resultSet.data); 
					} else if (resultSet.status.trim() == "error") 
					{ 
						 $("#alertError").text(resultSet.data); 
						 $("#alertError").show(); 
					}

			} else if (status == "error") 
			{ 
				$("#alertError").text("Error while saving."); 
				$("#alertError").show(); 
			} else
			{ 
				$("#alertError").text("Unknown error while saving.."); 
				$("#alertError").show(); 
			}
		
		$("#Paymentid").val(""); 
		$("#Paymentform")[0].reset();

	}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
	{ 
		 $("#Paymentid").val($(this).data("paymentid")); 
		 $("#customerName").val($(this).closest("tr").find('td:eq(0)').text()); 
		 $("#accountNumber").val($(this).closest("tr").find('td:eq(1)').text()); 
		 $("#amount").val($(this).closest("tr").find('td:eq(2)').text()); 
		 $("#cardNumber").val($(this).closest("tr").find('td:eq(3)').text()); 
		 $("#date").val($(this).closest("tr").find('td:eq(4)').text());
		 $("#cvv").val($(this).closest("tr").find('td:eq(5)').text());
	}); 

//DELETE==========================================
$(document).on("click", ".btnRemove", function(event) 
	{ 
		 $.ajax( 
			 { 
				 url : "Payments", 
				 type : "DELETE", 
				 data : "pID=" + $(this).data("paymentid"),
				 dataType : "text", 
				 complete : function(response, status) 
					 { 
					 	PaymentDelete(response.responseText, status); 
					 } 
			 }
		 ); 
	}
);

function PaymentDelete(response, status) 
	{ 
		if (status == "success") 
			{ 
				var resultSet = JSON.parse(response); 
				if (resultSet.status.trim() == "success") 
					{ 
						$("#alertSuccess").text("Deleted Successfully"); 
						$("#alertSuccess").show(); 
						$("#divPaymentGrid").html(resultSet.data); 
					} else if (resultSet.status.trim() == "error") 
					{ 
						$("#alertError").text(resultSet.data); 
						$("#alertError").show(); 
					} 
			} else if (status == "error") 
				{ 
					$("#alertError").text("Error while deleting."); 
					$("#alertError").show(); 
				} else
					 { 
						 $("#alertError").text("Unknown error while deleting.."); 
						 $("#alertError").show(); 
					 } 
	}

// CLIENT-MODEL================================================================
function validatePaymentForm() 
	{ 
		// CUSTOMER NAME
		if ($("#customerName").val().trim() == "") 
		 { 
			return "Please Enter Customer Name"; 
		 } 
		
		//Account Number
		if ($("#accountNumber").val().trim() == "") 
		 { 
			return "Please Enter AccountNumber"; 
		 } 
		
		// Amount
		if ($("#amount").val().trim() == "") 
		 { 
			return "Please Enter Amount"; 
		 }
		
		// Card Number
		if ($("#cardNumber").val().trim() == "") 
		 { 
			return "Please Enter Card Number"; 
		 }
		
		// Date
		if ($("#date").val().trim() == "") 
		 { 
			return "Please Enter Date"; 
		 }
		 
		// CVV
		if ($("#cvv").val().trim() == "") 
		 { 
			return "Please Enter CVV"; 
		 } 
		 
		// is numerical value
		var payAmount = $("#amount").val().trim(); 
		if (!$.isNumeric(payAmount)) 
		 { 
			return "Insert a numerical value for Paid Amount."; 
		 } 
		

		
		
		 return true; 
	}