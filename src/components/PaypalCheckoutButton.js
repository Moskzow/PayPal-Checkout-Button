import React from "react";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";
import PropTypes from "prop-types";

const PaypalCheckoutButton = ({ order }) => {
	const paypalConf = {
		currency: "USD",
		env: "sandbox",
		client: {
			sandbox: "AawvPTlvCFkpEpR0OeqXS5k-6qsgHXQHg0zViBMqM4gZpmEh0J_lw9ti5hF0Ykn6nCFZKtX9bp9fC5Tf",
			production: "--"
		},
		style: {
			label: "pay",
			size: "small", // small | medium | large | responsive
			shape: "pill", // pill | rect
			color: "blue" // gold | blue | silver | black
		}
	};

	const PayPalButton = paypal.Button.driver("react", { React, ReactDOM });

	const payment = (data, actions) => {
		const payment = {
			transactions: [
				{
					amount: {
						total: order.total,
						currency: paypalConf.currency
					},
					description: "Su compra",
					custom: order.customer || "",
					item_list: {
						items: order.items
					}
				}
			],
			note_to_payer: "Contáctanos para cualquier aclaración sobre tu compra. "
		};

		// console.log(payment);
		return actions.payment.create({
			payment
		});
	};

	const onAuthorize = (data, actions) => {
		return actions.payment
			.execute()
			.then(response => {
				console.log(response);
				alert(`El pago con PayPal se ha realizado correctamente, guarde el siguiente ID: ${response.id}`);
			})
			.catch(error => {
				console.log(error);
				alert("Ocurrió un error en el proceso de pago con PayPal, vuelva a intentarlo.");
			});
	};

	const onError = error => {
		alert("El pago con PayPal no fue realizado, vuelva a intentarlo.");
	};

	const onCancel = (data, actions) => {
		alert("El pago con PayPal no fue realizado, el usuario canceló el proceso.");
	};

	return (
		<PayPalButton
			env={paypalConf.env}
			client={paypalConf.client}
			payment={(data, actions) => payment(data, actions)}
			onAuthorize={(data, actions) => onAuthorize(data, actions)}
			onCancel={(data, actions) => onCancel(data, actions)}
			onError={error => onError(error)}
			style={paypalConf.style}
			commit
			locale="es_SV"
		/>
	);
};

PaypalCheckoutButton.propTypes = {
	order: PropTypes.object
};

export default PaypalCheckoutButton;
