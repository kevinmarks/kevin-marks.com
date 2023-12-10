function peril_roll(rounds=1,dice_count=6,success=0.5) {
    let wins=0
    const result={"survived":"well, duh",history:[]}
    while (rounds>0){
        const this_round=[]
        wins=0
        for (let die=0; die<dice_count; die++){
            const roll=Math.random()
            if (roll>success){
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

function odds (n,success) {
    return 1-Math.pow(success,n)
    // const outcomes = 1<<n; // was 1<<n as they were binary outcomes
    // return (outcomes-1)/outcomes;
}

function peril_odds(r,n,success=0.5){
    if (r==1){
        return odds(n,success)
    } else {
        let p=permute(n)
        let total=0
        let cumulative_odds=0
        for (i in p) {
            total+=p[i]
            cumulative_odds+=p[i]*peril_odds(r-1,i,success)
        }
        return cumulative_odds/total

    }
}