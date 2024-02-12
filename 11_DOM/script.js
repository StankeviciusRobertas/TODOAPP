function changeLi() {
    const my_ul = document.getElementsByTagName('ul')[0];
    const my_coffee_li = my_ul.getElementsByTagName('li')[0];
    my_coffee_li.innerHTML = 'Latte';
}

function addMilk() {
    const my_ul = document.getElementsByTagName('ul')[0];
    my_ul.innerHTML += '<li class="drink milk">Milk</li>'
}

function countLi() {
    const my_ul = document.getElementsByTagName('ul')[0];
    const len = my_ul.children.length
    return `There are ${len} elements in the list.`;
}

function countDrinks() {
    document.getElementById('element_count').innerHTML = countLi()
}

function changeAllMilkToAlmond() {
    const list_of_milk_li = document.getElementsByClassName('milk');
    for (let milk_li of list_of_milk_li) {
        milk_li.innerHTML = 'Almond Drink';
    }
}

function changeWaterBgColorToBlue() {
    const list_of_water_li = document.getElementsByClassName('water');
    for (let water_li of list_of_water_li) {
        water_li.style.backgroundColor = 'blue';
    }
}

function changeWaterClass() {
    const list_of_water_li = document.getElementsByClassName('water');
    for (let water_li of list_of_water_li) {
        water_li.classList.remove('water');
        water_li.classList.add('pretty_water');
    }
}