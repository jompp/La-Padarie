let line = []

lineRender()

// ____abre o modal e reinicia o forms____
let modal = document.getElementById('modal')
document.getElementById('act-modal-btn').addEventListener('click', () => { 
    modal.classList.add('active')
    document.getElementById('modal-form').innerHTML = `
        <input id="user-name" type="text" name="user-name" placeholder="Nome completo do cliente" required>
        <input id="breads-number" type="number" name="breads-number" placeholder="Total de pães" required>
        `    
})

// ____função para renderizar a fila____
function lineRender() {
    document.getElementById('cards').innerHTML = ''
    let totalBreadsSold = 0
    line.forEach((order) => {
        order.order = line.indexOf(order)
        totalBreadsSold += Number(order.breads)
        let price = order.breads/2
        document.getElementById('cards').innerHTML += `
        <div class="card">
            <div class="text-content">
                <p>${order.name}</p>
                <div class="total-box">
                    <p>Total de pães:  <span>${order.breads}</span></p>
                    <p>Total a pagar:  <span>${price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>
                </div>
            </div>
            <button class="trash-btn" onclick='excludeOrder(${order.order})'><img src="images/trash.svg" alt="Ícone de lixeira"></button>
        </div>
        `
    }); 
    let totalMoneyMade = totalBreadsSold/2
    document.getElementById('total-people').innerHTML = line.length
    document.getElementById('total-breads').innerHTML = totalBreadsSold
    document.getElementById('total-money').innerHTML = totalMoneyMade.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
};

// ____atualiza a fila____
document.getElementById('send-btn').addEventListener('click', () => {
    let sendName = document.getElementById('user-name')
    let sendBreads = document.getElementById('breads-number')
    if (sendBreads.value != '' && sendName != '' && /[^0-9]+/.test(sendName.value)) {
        line.push({
            name: sendName.value,
            breads: sendBreads.value,
            order: line.length 
        })
        lineRender()
        modal.classList.remove('active')
        sendBreads.value = '', sendName.value = ''
    } else {
        document.getElementById('modal-form').innerHTML = `
        <input id="user-name" type="text" name="user-name" placeholder="Nome completo do cliente" required>
        <input id="breads-number" type="number" name="breads-number" placeholder="Total de pães" required>
        <p class="error-msg">Todos os campos devem ser preenchidos</p>
        `
    }
})

document.getElementById('cancel-btn').addEventListener('click', () => {
    modal.classList.remove('active')
})

// ____exclui pedido da fila____
function excludeOrder(order) {
    line.splice(order, 1)
    lineRender()
}

