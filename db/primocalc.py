"""
primocalc.py
calculates resources needed for pulling a 5 star by the end of a certain patch based on resource inputs
track progess based on original plans

created by Thanakrit Paisal, around mid september 2023 (A++ sally)

"""

import datetime
import threading
import time
import math

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
def calendar(currentpatch,date):
    half = 1
    currentpatch += 0.1
    currentpatch = round(currentpatch,2)
    p = currentpatch
    nextpatchdate = date + datetime.timedelta(days=21)
    patchdates = {}
    for i in range(70):
        if str(p)[-1] == "8":
            p = float(math.floor(p+1))
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
    #print(patchdates)
    return patchdates

print(calendar)


"""
def getcurrent return the current patch and half by calculating the date difference between today and the latest data in database
inputs float patch and sql date
outputs list [float patch, int half]
"""
def getcurrent(patch,date):
    today = datetime.date.today()
    half = 2
    while (today-date).days > 21:
        if half == 1:
            half = 2
        else:
            half = 1
            if str(patch)[-1] == "8":
                 patch = float(math.floor(patch+1))
            else:
                patch += 0.1
                patch = round(patch,2)
        date = date + datetime.timedelta(days=21)

    return [patch,half]

print(getcurrent(4.1,datetime.date(2023,9,27)))
        


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
    while fivestars > 0:
        if guarantee == True:
            primoneed += 90*160
            guarantee = False
            fivestars -= 1
        else:
            primoneed += 90*160
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

def accumulate(days,havewelk,havebp,welkin,welkinplan,bp,bpplan,target,currentpatch):
    dailies = 60
    welk = 90
    primos4free = days*dailies
    patch2targ = (target[0] - currentpatch)*10
    patch2targ = round(patch2targ,2)
    print(patch2targ)

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
   
    if havebp == True:
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

def plan(days,primos4free,reqprimos,havewelk,havebp,welkin,welkinplan,bpplan,target):
    welk = 90
    currentpatch = 4.0
    patch2targ = (target[0] - currentpatch)*10
    patch2targ = round(patch2targ,2)
    extra = 0

    if primos4free < reqprimos:
        print("you will need an extra", reqprimos - primos4free)
        welkneed = 0
        bpneed = 0
        if havewelk == False or days-(welkin+(welkinplan*30)) > 0:
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
        extra = 0
    
    return primos4free,reqprimos,welkneed,bpneed,extra

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
fivestars = recieves integer of the number of 5 stars needed (how many C for target character) (your C + 1) defaluts to None if user want to calculate for primos
primowant = integer for how many primos the user wants to have, defaults to 0 if user choose to calculate for 5 stars

"""

def calculations(primos,crystals,fates,pity,havewelk,havebp,welkinplan,bpplan,fiveorprimos,currentpatch,date,welkin=0,bp=0,guarantee=None,targetpatch=None,half=None,fivestars=None,primowant=0):
    currenttime = datetime.date.today()
    patchdates = calendar(currentpatch,date)
    #print(patchdates)
    #calculates requirements for 5 star planning
    #print(patchdates[str(targetpatch)][str(half)])
    patchend = patchdates[str(targetpatch)][str(half)]
    timeremaining = patchend - currenttime
    days = timeremaining.days
    target = [float(targetpatch),int(half)]
    currenttotal = primos+crystals
    primosmade = accumulate(days,havewelk,havebp,welkin,welkinplan,bp,bpplan,target,currentpatch)
    primos4free = currenttotal+primosmade+(fates*160)
    fates4free = primos4free//160

    if fiveorprimos == 0:
        worseprimos = worsecase(fivestars,guarantee) - primos - crystals - (fates*160) - (pity*160)
        bestprimos = bestcase(fivestars) - primos - crystals - (fates*160) - (pity*160)
        #print("best case primos needed", bestprimos)
        bestplan = plan(days,primosmade,bestprimos,havewelk,havebp,welkin,welkinplan,bpplan,target)
        #print("worse case primos needed", worseprimos)
        worseplan = plan(days,primosmade,worseprimos,havewelk,havebp,welkin,welkinplan,bpplan,target)
        possible,bestreq,bestwelk,bestbp,bestextra = bestplan[0],bestplan[1],bestplan[2],bestplan[3],bestplan[4]
        possible,worsereq,worsewelk,worsebp,worseextra = worseplan[0],worseplan[1],worseplan[2],worseplan[3],worseplan[4]
        bestreq -= primosmade
        worsereq -= primosmade
        primoreq,planwelk,planbp,planextra = None,None,None,None

    elif fiveorprimos == 1:
        #def plan(days,primos4free,reqprimos,havewelk,havebp,welkin,welkinplan,bpplan,target):
        primowant = primowant -  primos - crystals
        primoplan = plan(days,primosmade,primowant,havewelk,havebp,welkin,welkinplan,bpplan,target)
        possible,primoreq,planwelk,planbp,planextra = primoplan[0],primoplan[1],primoplan[2],primoplan[3],primoplan[4]
        primoreq -= primosmade
        bestreq,bestwelk,bestbp,bestextra = None,None,None,None
        worsereq,worsewelk,worsebp,worseextra = None,None,None,None

    """
    return values

    currenttotal = integer of primos + crystals
    primosmade = integer amount of primos that user will generate by end of patch half
    fates4free = integer number of total fates converted from total primos user will have by end of patch
    target = array of [float patch, int half]
    primos4free = integer number of total primos user will have by end of patch half
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
    return {"currenttotal": currenttotal, 
            "primosmade": primosmade, 
            "fates4free": fates4free,
            "target": target,
            "patchend": patchend, 
            "fiveorprimos" : fiveorprimos,
            "primos4free": primos4free, 
            "possible": possible,
            "bestreq": bestreq,
            "bestwelk": bestwelk,
            "bestbp": bestbp,
            "bestextra": bestextra,
            "worsereq": worsereq,
            "worsewelk": worsewelk,
            "worsebp": worsebp,
            "worseextra": worseextra,
            "primoreq": primoreq,
            "planwelk": planwelk,
            "planbp": planbp,
            "planextra": planextra}


"""
!! READ ME !!

changes on def calculations

input:
    parameters welkin and bp now defaults to 0 if user doesn't have welk or bp (test case fix)

output:
    these are added cuz they will be used in def progress
    patchend = final date of target, date format
    fiveorprimos = (0,1) used to determine what progress to track

"""


"""
def progress calculates the % progress from the difference of (total amount of resources generated by end date with current plan - the previous total generated) / the extra needed resources
for best case, worse case, so specific amount of primos

***************************************
new inputs from user
    primos = int current amount of primos
    crystals = int current crystals
    fates = int current fates
    havewelk = user may have bought themselves some welk after the previous plan, boolean
    havebp = user may have bought themselves some welk after the previous plan, boolean
    welkdays = welkin days remaining defaults to 0 if user didn't have welks, int
    bplvl = current bp level, defaults to 0 if user didn't have bp, int
    welkinplan = how many more wekin user want to buy, defaults to 0, int
    bpplan = how many more bp user want to buy, defaults to 0, int

***************************************
inputs from database/previous plan
    prevaccumulate = corresponds to output primos4free from def calculations
    primosmade = corresponds to primosmade from def calculations
    fiveorprimos = corresponds to fiveorprimos from def calculations
    currentpatch = from db
    target = corresponds to target from def calculations
    patchend = corresponds to patchend from def calculations 
    bestprimos = corresponds to bestreq from def calculations
    worseprimos = corresponds to worsereq from def calculations
    primosneed = corresponds to primosreq from def calculations

***************************************

"""
def progress(primos,crystals,fates,prevaccumulate,fiveorprimos,havewelk,havebp,currentpatch,target,patchend,bestprimos=0,worseprimos=0,primosneed=0,welkdays=0,bplvl=0,welkinplan=0,bpplan=0):
    days = patchend - datetime.date.today()
    days = days.days
    currentresources = primos+crystals+(fates*160)
    primos4free = accumulate(days,havewelk,havebp,welkdays,welkinplan,bplvl,bpplan,target,currentpatch) + currentresources
    primos4free = round(primos4free,2)
    fates4free = primos4free//160
    moreprimos = primos4free-prevaccumulate
    if fiveorprimos == 0:
        primoprogress = 0
        bestprogress = (moreprimos/bestprimos)*100
        worseprogress = (moreprimos/worseprimos)*100
        if bestprogress > 100:
            bestprogress = 100
        if worseprogress > 100:
            worseprogress = 100
    elif fiveorprimos == 1:
        primoprogress = (moreprimos/primosneed)*100
        bestprogress = 0
        worseprogress = 0
        if primoprogress > 100:
            primoprogress = 100

    """
    return values
    bestprogess = float % of progress for best case rounded to 2 decimal places
    worseprogess = float % of progress for worse case rounded to 2 decimal places
    primoprogess = float % of progress for specific primos rounded to 2 decimal places
    moreprimos = int the amount of primos (current primos + primos made by welkin/bp) user has made more than their privious plan
    fates4free = int primos users has converted to fates

    """
    return {"bestprogess": round(bestprogress,2),
            "worseprogress": round(worseprogress,2),
            "primoprogress": round(primoprogress,2),
            "moreprimos": moreprimos,
            "fates4free": fates4free }


"""

def calculations is the only function you have to call once user hits calculate. although def calendar must also be running constantly

I LOVE HU TAO
I LOVE FURINA
I LOVE VENTI
I LOVE BEER

"""


#def calculations(primos,crystals,fates,pity,havewelk,havebp,welkinplan,bpplan,fiveorprimos,currentpatch,date,welkin=0,bp=0,guarantee=None,targetpatch=None,half=None,fivestars=None,primowant=0):
#print(calculations(11347,120,80,0,True,True,3,2,1,4.1,datetime.date(2023,10,17),32,11,False,4.2,1,0,100000))
#print(calendar(4.1,datetime.datetime(2023,9,27,3) + datetime.timedelta(days=42)))

#def progress(primos,crystals,fates,prevaccumulate,fiveorprimos,havewelk,havebp,currentpatch,target,patchend,bestprimos=0,worseprimos=0,primosneed=0,welkdays=0,bplvl=0,welkinplan=0,bpplan=0):
print(progress(1500,0,5,3000,0,True,True,4.1,[4.2,1],datetime.date(2023,9,27) + datetime.timedelta(days=21),10000,10000+(90*160),0,10,10,1,1))