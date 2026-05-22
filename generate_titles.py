import random

sizes = ["18", "19", "20", "21", "22", "24"]
pcds = ["5x112", "5x114.3", "5x120", "5x130", "5x108", "5x115", "5x127"]
styles = ["Step Lip", "Deep Concave", "Floating Spoke", "Modular", "Split Rim", "Multi Spoke", "Mesh Design"]
finishes = ["Brushed Silver", "Brushed Bronze", "Mirror Polished Barrel", "Gloss Black", "Candy Red", "Brushed Champagne", "Matte Anthracite", "Custom Finish"]
hardware = ["Hidden Hardware", "Exposed Titanium Bolts", "Exposed Gold Rivets", "Exposed Chrome Bolts"]
cars = [
    "Audi RS6 RS7", "BMW M3 M4 G80", "Tesla Model S Plaid", "Porsche 911 Turbo S", "Mercedes AMG GT",
    "Nissan GTR R35", "Lamborghini Urus", "Ferrari 488 458", "BMW X5 X6 M", "Audi R8 V10",
    "Range Rover Sport", "Ford Mustang GT500", "Chevrolet Corvette C8", "Lexus LC500", "Dodge Challenger SRT",
    "Bentley Continental GT", "Rolls Royce Ghost", "Maserati MC20", "McLaren 720S", "Toyota Supra MK5"
]

titles = []
used_titles = set()

while len(titles) < 100:
    size = random.choice(sizes)
    pcd = random.choice(pcds)
    style = random.choice(styles)
    finish = random.choice(finishes)
    hw = random.choice(hardware)
    car = random.choice(cars)
    
    title = f"{size} Inch {pcd} 2-Piece Forged Wheels {style} {finish} {hw} Rims for {car}"
    if title not in used_titles:
        titles.append(title)
        used_titles.add(title)

for i, t in enumerate(titles, 1):
    print(f"| {i} | {t} |")
