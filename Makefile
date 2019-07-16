SRC ?= .
PROLOG_SRC := feelings.pl air.pl earth.pl water.pl
PROLOG_SRC += head.pl
PROLOG_SRC += things.pl

facts: $(addprefix $(SRC)/db/prolog/,$(PROLOG_SRC))
	gplc $^ -o $@
