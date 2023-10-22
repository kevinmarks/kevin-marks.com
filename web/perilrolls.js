function peril_roll(rounds=1,dice_count=6) {
    let wins=0
    const result={"survived":"well, duh",history:[]}
    while (rounds>0){
        const this_round=[]
        wins=0
        for (let die=0; die<dice_count; die++){
            const roll=Math.random()
            if (roll>0.5){
                this_round.push("win")
                wins+=1;
            } else {
                this_round.push("lose")
            }
        }
        result.history.push(this_round)
        if (wins==0) {
            result.survived="You died"
            return result
        }
        rounds-=1;
        if (rounds==0) {
            result.survived="You lived"
            return result
        }
        dice_count =wins
    }
    return result
}


function factorial(n){
    if(n==0 || n==1){
        return 1
    } else {
        return(n*factorial(n-1))
    }
}

function combination(n,m){
    return factorial(n)/(factorial(m)*factorial(n-m))
}

function permute(n){
    let op=[]
    for(let i=0;i<=n;i++) {
        op.push(combination(n,i))
    }
    return op
}

function odds (n) {
    const outcomes = 1<<n;
    return (outcomes-1)/outcomes;
}

function peril_odds(r,n){
    if (r==1){
        return odds(n)
    } else {
        let p=permute(n)
        let total=0
        let cumulative_odds=0
        for (i in p) {
            total+=p[i]
            cumulative_odds+=p[i]*peril_odds(r-1,i)
        }
        return cumulative_odds/total

    }
}