package com.vital.web.service;

import com.vital.web.domain.DailyNote;
import com.vital.web.domain.User;

import java.util.List;

public interface DailyNoteService {

    DailyNote create(DailyNote user);

    List<DailyNote> findAll();

    DailyNote getById(String id);

}
