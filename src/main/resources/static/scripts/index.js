$(function(){
    fetchAllTickets();
});

let tickets = [];
function fetchAllTickets() {
    $.get("/hentTicket", function(data) {
        tickets = data;
        renderTickets(tickets);
    });
}
function renderTickets(tickets) {
    let ticketTable = "<table>";
    ticketTable += "<tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnummer</th>" +
        "<th>E-Post</th>" +
        "<th>ID</th>" +
        "<th>Action</th>" +
        "</tr>";

    tickets.forEach((ticket) => {
        console.log(ticket);
        ticketTable += "<tr>";
        Object.values(ticket).forEach((value) => {
            ticketTable += "<td>" + value + "</td>";
            console.log(typeof ticket.ID)
        });
        console.log(ticket.ID);
        ticketTable += `<td><button class='btn btn-danger' onclick='deleteTicket(${ticket.ID})'>Slett</button></td>`;
        ticketTable += "</tr>";
    });

    ticketTable += "</table>";
    $(".billetter").html(ticketTable);
}
function deleteAlle() {
    $.ajax({
        url: '/deleteAll',
        type: 'DELETE',
        success: function (data) {
            console.log("Success:", data);
            fetchAllTickets();
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("wrong!!!");
        }
    });
}
function deleteTicket(ticketID) {
    $.ajax({
        url: '/deleteAll',
        type: 'DELETE',
        contentType: "application/json",
        data: JSON.stringify(ticketID),
        success: function (data) {
            console.log("Success:", data);
            fetchAllTickets();
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("wrong!");

        }


    });
}
$("#bestillingsskjema").submit(function(event) {
    event.preventDefault();
    const formData = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefon: $("#telefon").val(),
        epost: $("#epost").val(),
    };

    // Validering- sjekker inputtet og gir tilbakemelding hvis det trengs

    if (!formData.film||!formData.antall|| !formData.fornavn|| !formData.etternavn||!formData.telefon ||!formData.epost) {
        alert("Required fields.");
        return;
    }

    // Regex telefon- sjekker inputtet og gir tilbakemelding hvis det trengs

    let tlfRegEx = /^[0-9]{8}$/;
    if (!tlfRegEx.test(formData.telefon)) {
        alert("Enter a valid phone number.");
        return;
    }
    // Regex epost- sjekker inputtet og gir tilbakemelding hvis det trengs

    let epostRegEx = /^[A-Za-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/;
    if (!epostRegEx.test(formData.epost)) {
        alert("Enter a valid email.");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/lagreTicket",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (data) {
            console.log("Success:", data);
            fetchAllTickets();
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
            alert(" wrong!");
        }
    });
});
