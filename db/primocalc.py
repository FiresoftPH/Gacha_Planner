"""
primocalc.py
calculates resources needed for pulling a 5 star by the end of a certain patch based on resource inputs

created by Thanakrit Paisal, around mid september 2023 (A++ sally)

"""

import datetime
import threading
import time

"""
def calendar involves a while True loop that constantly checks current time
and updates current patch if current time exceeds the date of the next patch
unused but not deleting just in case

"""
def calendarupdates(currentpatch,nextpatchdate):
    global patchdates
    patchdates = {}
    while True:
        currenttime = datetime.datetime.now()
        if currenttime > nextpatchdate - datetime.timedelta(days=21):
            nextpatchdate = currenttime + datetime.timedelta(days=21)
            half = 1
            patchdates = {}
            currentpatch += 0.1
            currentpatch = round(currentpatch,2)
        if patchdates == {}:
            half = 1
            p = currentpatch
            p += 0.1
            p = round(p,2)
            for i in range(10):
                if half == 1:
                    patchdates[str(p)] = {str(half): nextpatchdate}
                    #patchdates[str(currentpatch)][str(half)] = nextpatchdate
                    half = 2
                elif half == 2:
                    # half = 1
                    # currentpatch += 0.1
                    # currentpatch = round(currentpatch,2)
                    patchdates[str(p)]["2"] = nextpatchdate
                    p += 0.1
                    p = round(p,2)
                    half = 1
                nextpatchdate = nextpatchdate + datetime.timedelta(days=21)
        time.sleep(1.0)
"""
def calendar recieves float for the current patch and generates a dict of 
dates for end of patch half for the next 5 patches

"""
def calendar(currentpatch):
    half = 1
    currentpatch += 0.1
    currentpatch = round(currentpatch,2)
    p = currentpatch
    fourone = datetime.datetime(2023,9,27,3) + datetime.timedelta(days=21)
    while currentpatch > 4.1:
        nextpatchdate = fourone + datetime.timedelta(days=42) 
        currentpatch -= 0.1
        currentpatch = round(currentpatch,2)
    patchdates = {}
    for i in range(10):
        if half == 1:
            patchdates[str(p)] = {"1": nextpatchdate}
            #patchdates[str(currentpatch)][str(half)] = nextpatchdate
            half = 2
        elif half == 2:
            #patchdates[str(p)]["2"] = nextpatchdate
            patchdates[str(p)]["2"] = nextpatchdate
            p += 0.1
            p = round(p,2)
            half = 1
        nextpatchdate = nextpatchdate + datetime.timedelta(days=21)

    return patchdates

""" 

the commented code below are unused, they are for testing purposes

"""

# calthread = threading.Thread(target=calendar,args = (4,datetime.datetime(2023,9,27,3)))
# calthread.start()

# print(patchdates)

# print("welcome to gacha calc, input your shit")
# primos = int(input("current primos: "))
# crystals = int(input("CRYSTALLIZED: "))
# fates = int(input("fates: "))
# pity = int(input("pity your down bad souls: "))
# guarantee = input("guarenteed? (y/n) ")
# targetpatch = input("where is your WAIFU: ")
# half = input("half: ")
# fivestars = int(input("5 stars: "))
# havewelk = input("have wekin? (y/n) ")
# havebp = input("have bp? (y/n) ")


"""
def worsecase recieves the number of 5 stars needed (how many C for target character)
and if user currently has guarantee, then calculate primos needed assuming 
they lose 50/50 every time
kenshiro moment

"""
def worsecase(fivestars,guarantee):
    primoneed = 0
    for i in range(fivestars):
        if guarantee == True:
            primoneed += 90*160
            guarantee = False
        else:
            primoneed += 180*160
            guarantee = True
    return primoneed

"""
def bestcase recieves the number of 5 stars needed (how many C for target character)
then calculate and returns primos needed assuming they win 50/50 every time
motherfucking puttipatt

"""
def bestcase(fivestars):
    primoneed = 0
    for i in range(fivestars):
        primoneed += 90*160
    return primoneed
"""
def accumulate recieves days until end of target patch half
along with everything else that generates primos (welkin and bp and their current plans
for how many of these they are going to buy)

it calculates and returns amounts of primos user will generate by end of patch half
"""

def accumulate(days,havewelk,havebp,welkin,welkinplan,bp,bpplan,target):
    dailies = 60
    welk = 90
    currentpatch = 4.0
    primos4free = days*dailies
    patch2targ = (target[0] - currentpatch)*10
    patch2targ = round(patch2targ,2)

    if havewelk == True:
        # 1 welkin = 30days
        if welkin < days:
            primos4free += welk*welkin
            for i in range(1,welkinplan+1):
                primos4free += welk*30
                if i*30 > days-welkin:
                    primos4free += welk*(days-welkin-((i-1)*30))
                    break
        else:
            primos4free += welk*days
   
    elif havebp == True:
        # 1 bp round = patchround
        # 4 fates 680 primos per patch
        if bp < 50:
            primos4free += ((((40-bp)//10)+1)*160) + 680
        if bpplan > patch2targ:
            primos4free += (target[0] - currentpatch)*((4*160)+680)
        if bpplan <= patch2targ:
            primos4free += bpplan*((4*160)+680)
    return primos4free

"""
def plan takes required primos from def calculations 
(runs twice, once for best and once for worse cases)
determines extra resources needed to achive the required primos based on
primos generated by user from def accumulate (primos4free)

returns primos generated, required primos, extra welkins and bp needed

"""

def plan(days,primos4free,reqprimos,havewelk,havebp,welkin,bpplan,target):
    welk = 90
    currentpatch = 4.0
    patch2targ = (target[0] - currentpatch)*10
    patch2targ = round(patch2targ,2)

    if primos4free < reqprimos:
        print("you will need an extra", reqprimos - primos4free)
        welkneed = 1
        bpneed = 0
        if havewelk == False or days-welkin > 0:
            while primos4free < reqprimos and (welkneed*30) <= days-welkin:
                primos4free += welk*30
                welkneed += 1

        if havebp == False or bpplan < patch2targ:
            while primos4free < reqprimos and bpneed+bpplan < patch2targ:
                primos4free += (4*160)+680
                bpneed += 1
        
        extra = reqprimos - primos4free
        if extra < 0:
            extra = 0

        print(welkneed,"more welkin than planned",bpneed,"more battle passes (lv50) than planned","and an extra",extra,"primos")
    else:
        welkneed = 0
        bpneed = 0
    
    return primos4free,reqprimos,welkneed,bpneed, extra

"""
main function for calculations, uses all the other functions above
recieves the inputs from ruj's frontend

primos = integer current primos user has
crystals = integer current genesis crystals user has
fates = integer current fates user has
pity = integer pity
havewelk = boolean do they have welkin
havebp = boolean do they have battle pass (FORTNITE!!!!!!!)
welkin = integer days remaining for their welkins
bp = integer current bp level
welkinplan = integer for how many welkins user plan to purchase
bpplan = interger for bp (by patch) users plan to buy, calculations assume users is able to get to lv50 by end end of patch half
patchdates = python dict recieves patch calendar from def calendar (5 patches from current, can be changed if you want)
fiveorprimos = input for this parameter must be 0 or 1 (sorry ruj my miaumiau) 0 being users want to calculate for target character, 1 is if user wants to calculate for just primos
guarantee = input must be True or False in python boolean (sorry ruj my miaumiau) defaults to None if user decides to calculate for primos instead of 5 stars
targetpatch = recives float value of a patch ranging from current patch to the next 5 patches (e.g. 4.1, 4.2, 4.5) (changable if needed) defaults to None if user wants to calc for primos
half = recives integer 1 or 2, this parameter and targetpatch will be used to retrieve dates from def calendar, defaluts to None (wait a minute it doesn't have to)
fivestars = recieves integer of the number of 5 stars needed (how many C for target character) defaluts to None if user want to calculate for primos
primowant = integer for how many primos the user wants to have, defaults to 0 if user choose to calculate for 5 stars

"""

def calculations(primos,crystals,fates,pity,havewelk,havebp,welkin,bp,welkinplan,bpplan,fiveorprimos,currentpatch=4.1,guarantee=None,targetpatch=None,half=None,fivestars=None,primowant=0):
    currenttime = datetime.datetime.now()
    patchdates = calendar(currentpatch)
    #calculates requirements for 5 star planning
    print(patchdates[targetpatch][half])
    timeremaining = patchdates[targetpatch][half] - currenttime
    days = timeremaining.days
    target = [float(targetpatch),int(half)]
    currenttotal = primos+crystals
    primos4free = accumulate(days,havewelk,havebp,welkin,welkinplan,bp,bpplan,target)
    primosmade = primos4free - currenttotal
    fates4free = primos4free//160

    # print("\n")
    # print("days remaining", days)
    # print("primos you can make by the end of target patch half", primos4free)
    # print("god bless ya gambling addict")

    if fiveorprimos == 0:
        worseprimos = worsecase(fivestars,guarantee) - primos - crystals - (fates*160) - (pity*160)
        bestprimos = bestcase(fivestars) - primos - crystals - (fates*160) - (pity*160)
        #print("best case primos needed", bestprimos)
        bestplan = plan(days,primos4free,bestprimos,havewelk,havebp,welkinplan,bpplan,target)
        #print("worse case primos needed", worseprimos)
        worseplan = plan(days,primos4free,worseprimos,havewelk,havebp,welkinplan,bpplan,target)
        possible,bestreq,bestwelk,bestbp,bestextra = bestplan[0],bestplan[1],bestplan[2],bestplan[3],bestplan[4]
        possible,worsereq,worsewelk,worsebp,worseextra = worseplan[0],worseplan[1],worseplan[2],worseplan[3],worseplan[4]
        primoreq,planwelk,planbp = None,None,None

    elif fiveorprimos == 1:
        primoplan = plan(days,primos4free,primowant,havewelk,havebp,welkinplan,bpplan,target)
        possible,primoreq,planwelk,planbp,planextra = primoplan[0],primoplan[1],primoplan[2],primoplan[3],primoplan[4]
        bestreq,bestwelk,bestbp = None,None,None
        worsereq,worsewelk,worsebp = None,None,None

    """
    return values

    currenttotal = integer of primos + crystals
    primosmade = integer amount of primos that user will generate by end of patch half
    fates4free = integer number of total fates converted from total primos user will have by end of patch
    target = array of [float patch, int half]
    primos4free = integer number of total primos user will make by end of patch half
    possible = integer number of total primo user could make by end of patch half if they follow the plan

    **** the values under here is returned if user chooses to calculate for 5 stars. returns None if other option is selected ****
    bestreq = integer best case primos required
    bestwelk = integer of how many welkin user has to buy for best case requirements (0 if none)
    bestbp = integer of how many bp user has to buy for best case requirements (0 if none)
    bestextra = extra primos user need to PAY for best case
    worsereq = integer worse case primos required
    worsewelk = integer of how many welkin user has to buy for worse case requirements (0 if none)
    worsebp = integer of how many bp user has to buy for worse case requirements (0 if none)
    worseextra = extra primos user need to PAY for best case

    ****the values under here is returned if user chooses to calculate for specified primos. returns None if other option is selected ****
    primoreq = integer number of primos user want
    planwelk = integer number for number of welkin user has to buy
    planbp = integer number for number of bp user has to buy
    planextra = extra primos needed to reach target primos

    """
    return currenttotal,primosmade,fates4free,target,primos4free,possible,bestreq,bestwelk,bestbp,bestextra,worsereq,worsewelk,worsebp,worseextra,primoreq,planwelk,planbp,planextra


"""

def calculations is the only function you have to call once user hits calculate. although def calendar must also be running constantly

I LOVE HU TAO
I LOVE FURINA
I LOVE VENTI
I LOVE BEER

"""

print(calculations(primos,crystals,fates,pity,targetpatch,half,fivestars,havewelk,havebp,patchdates))
print(calendar(4.1))
